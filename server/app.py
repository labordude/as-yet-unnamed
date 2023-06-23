# app.py

import os
from dotenv import load_dotenv

load_dotenv()
from flask import Flask, request, session
from flask_migrate import Migrate
from flask_restful import Resource
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from config import db, api, app
from models import User, Game, Review, Community
import requests
import datetime


# app = Flask(
#     __name__,
#     static_url_path="",
#     static_folder="../client/dist",
#     template_folder="../client/dist",
# )
# @app.route("/")
# @app.route("/<int:id>")
# def index(id=0):
#     # return send_from_directory("../client/dist", "index.html")
#     # return send_from_directory("../client", "index.html")
#     return {"message": "hello world"}
class Home(Resource):
    def get(self):
        return {"message": "hello world"}


# @app.before_request
# def check_if_logged_in():
#     if not session.get("user_id") and request.endpoint not in [
#         "home",
#         "login",
#     ]:
#         return {"error": "Unauthorized"}, 401


class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        image_url = data.get("image_url")
        bio = data.get("bio")
        new_user = User(username=username, image_url=image_url, bio=bio)
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except IntegrityError:
            return ({"error": "Unprocessable entry"}, 422)


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = (
                User.query.filter(User.id == session.get("user_id"))
                .first()
                .to_dict()
            )
            return user, 200

        return ({"error": "unauthorized"}, 401)

    pass


class Login(Resource):
    def post(self):
        session["user_id"] = 1
        return {"message": ["successful login", session]}, 200
        # username = request.get_json()["username"]
        # password = request.get_json()["password"]

        # user = User.query.filter(User.username == username).first()
        # if user:
        #     if user.authenticate(password):
        #         session["user_id"] = user.id
        #         return user.to_dict(), 200

        # return ({"error": "invalid login"}, 401)

    pass


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return ({"message": "logged out"}, 204)
        return ({"error": "401 unauthorized"}, 401)

    pass


class Games(Resource):
    def get(self):
        response = requests.get(
            "https://api.rawg.io/api/games?key=3eba459197494e8993ce88773ab7736c"
        )
        return (response.json(), 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_game = Game(
                name = data.get('name'),
                description = data.get('description'),
                platform = data.get('platform'),
                background_image = data.get('background_image'),
                release_date = data.get('release_date')
            )
            db.session.add(new_game)
            db.session.commit()

            return new_game.to_dict(only=("name", "description", "platform", "background_image", "release_date")), 201
        except:
            return {"error": "400: Validation error"}, 400
    

class GamesById(Resource):
    def get(self, id):
        try:
            game = (
                Game.query.filter(Game.id == id).first()
                .to_dict(only=("id", "name", "description", "platform", "background_image","release_date"))
            )
            return game, 200
        except:
            {"error": "404: Game not found"}, 404
    
    def patch(self, id):
        data = request.get_json()
        game = Game.query.filter(Game.id == id).first()
        if not game:
            return {"error": "404: Game not found"}, 404
        for attr in data:
            if attr == "release_date":
                setattr(
                    game, 
                    attr,
                    datetime.datetime.strptime(
                    data.get('release_date'), '%Y-%m-%d').date(),
                )
            else:
                setattr(game, attr, data.get(attr))
        try:
            db.session.add(game)
            db.session.commit()
            return game.to_dict(only=("id", "name", "description", "platform", "background_image","release_date")), 201
        except:
            return {"error": "Unable to update game"}, 400

    def delete(self, id):
        game = Game.query.filter(Game.id == id).first()
        if not game:
            return {"error": "404: Game ont found"}, 404
        db.session.delete(game)
        db.session.commit()
        return {}, 204

class ReviewsByGameId(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_review = Review(
                body = data.get('review'),
                rating = data.get('rating'),
                user_id = data.get('user_id'),
                game_id = data.get('game_id'),
                created_at = data.get('created_at'),
            )
            db.session.add(new_review)
            db.session.commit()

            return new_review.to_dict(only=("id", "body", "rating", "user_id", "game_id", "created_at")), 201
        except:
            {"error": "Unable to post review"}, 400

    def get(self, game_id):
        reviews = [r.to_dict(only=("body", "rating", "created_at", "user_id", "game_id")) 
                   for r in Review.query.filter(Game.id == game_id).all()]
        return reviews, 200
    
class ReviewsById(Resource):
    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter(Review.id == id).first()
        if not review: 
            return {"error": "404: Review not found"}, 404
        for attr in data:
            if attr == "updated_at":
                setattr(
                    review, 
                    attr, 
                    datetime.datetime.strptime(
                    data.get("updated_at"), "%Y-%m-%d").date(),
                )
            else:
                setattr(review, attr, data.get(attr))
        try:
            db.session.add(review)
            db.session.commit()
            return review.to_dict(only=("body", "rating", "updated_at", "user_id", "game_id")), 201
        except:
            return {"error": "Unable to update review"}, 400
        
    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            return {"error": "404: Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {}, 204
        
#def post(self, id)
#posts a reply to a specific review

api.add_resource(Games, "/games")
api.add_resource(GamesById, "/games/<int:id>")
api.add_resource(ReviewsByGameId, "/games/<int:id>")
api.add_resource(ReviewsById, "/games/<int:game_id>/<int:id>")
api.add_resource(Home, "/", endpoint="home")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
