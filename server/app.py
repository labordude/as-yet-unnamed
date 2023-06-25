# app.py

import os
from dotenv import load_dotenv

load_dotenv()
from flask import Flask, request, session, abort
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
        pfp_image = data.get("pf_image")
        name = data.get("name")
        email = data.get("email")
        bio = data.get("bio")
        new_user = User(
            username=username,
            name=name,
            email=email,
            pfp_image=pfp_image,
            bio=bio,
        )
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
        try:
            user = User.query.filter(User.id == session.get("user_id")).first()
            print(f'Current user is: {session.get("user_id")}')
            return user.to_dict(), 200
        except:
            return ({"error": "unauthorized"}, 401)

    pass


class Login(Resource):
    def post(self):
        # session["user_id"] = 1
        # return {"message": ["successful login", session]}, 200
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                print("successful login")
                session["user_id"] = user.id
                print(f"successfully logged in: {user.id}")
                return user.to_dict(), 200

        return ({"error": "invalid login"}, 401)

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
        # response = requests.get(
        #     "https://api.rawg.io/api/games?key=3eba459197494e8993ce88773ab7736c"
        # )
        games = [game.to_dict() for game in Game.query.all()]
        return (games, 200)

    def post(self):
        data = request.get_json()
        try:
            new_game = Game(
                name=data.get("name"),
                description=data.get("description"),
                platform=data.get("platform"),
                background_image=data.get("background_image"),
                release_date=data.get("release_date"),
            )
            db.session.add(new_game)
            db.session.commit()

            return (
                new_game.to_dict(
                    only=(
                        "name",
                        "description",
                        "platform",
                        "background_image",
                        "release_date",
                    )
                ),
                201,
            )
        except:
            return {"error": "400: Validation error"}, 400


class GamesById(Resource):
    def get(self, id):
        try:
            game = (
                Game.query.filter(Game.id == id)
                .first()
                .to_dict(
                    only=(
                        "id",
                        "name",
                        "description",
                        "platform",
                        "background_image",
                        "release_date",
                    )
                )
            )
            return game, 200
        except:
            return {"error": "404: Game not found"}, 404

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
                        data.get("release_date"), "%Y-%m-%d"
                    ).date(),
                )
            else:
                setattr(game, attr, data.get(attr))
        try:
            db.session.add(game)
            db.session.commit()
            return (
                game.to_dict(
                    only=(
                        "id",
                        "name",
                        "description",
                        "platform",
                        "background_image",
                        "release_date",
                    )
                ),
                201,
            )
        except:
            return {"error": "Unable to update game"}, 400

    def delete(self, id):
        game = Game.query.filter(Game.id == id).first()
        if not game:
            return {"error": "404: Game ont found"}, 404
        db.session.delete(game)
        db.session.commit()
        return {}, 204


class NewestGames(Resource):
    def get(self):
        newest_games = [game.to_dict() for game in Game.query.limit(10).all()]
        return newest_games, 200


class Reviews(Resource):
    def get(self):
        reviews = [
            r.to_dict(
                only=("body", "rating", "created_at", "user_id", "game_id")
            )
            for r in Review.query.all()
        ]
        return reviews, 200

    def post(self):
        data = request.get_json()
        try:
            new_review = Review(
                body=data.get("review"),
                rating=data.get("rating"),
                user_id=data.get("user_id"),
                game_id=data.get("game_id"),
                created_at=data.get("created_at"),
            )
            db.session.add(new_review)
            db.session.commit()

            return (
                new_review.to_dict(
                    only=(
                        "id",
                        "body",
                        "rating",
                        "user_id",
                        "game_id",
                        "created_at",
                    )
                ),
                201,
            )
        except:
            return {"error": "Unable to post review"}, 400


class ReviewsById(Resource):
    def get(self, id):
        review = (
            Review.query.filter_by(id=id)
            .first()
            .to_dict(only=("id", "body", "rating", "user_id", "game_id"))
        )
        return review, 200

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
                        data.get("updated_at"), "%Y-%m-%d"
                    ).date(),
                )
            else:
                setattr(review, attr, data.get(attr))
        try:
            db.session.add(review)
            db.session.commit()
            return (
                review.to_dict(
                    only=("body", "rating", "updated_at", "user_id", "game_id")
                ),
                201,
            )
        except:
            return {"error": "Unable to update review"}, 400

    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            return {"error": "404: Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {}, 204


class NewestReviews(Resource):
    def get(self):
        newest_reviews = [
            review.to_dict() for review in Review.query.limit(10).all()
        ]
        return newest_reviews, 200


class Users(Resource):
    def get(self):
        try:
            users = [
                u.to_dict(only=("id", "username", "pfp_image", "active"))
                for u in User.query.all()
            ]
            return users, 200
        except:
            return {"error": "Bad request"}, 400


class UsersById(Resource):
    def get(self, id):
        try:
            user = (
                User.query.filter(User.id == id)
                .first()
                .to_dict(
                    only=(
                        "id",
                        "username",
                        "name",
                        "email",
                        "pfp_image",
                        "bio",
                        "active",
                    )
                )
            )
            return user, 200
        except:
            return {"error": "404: User not found"}, 404

    def patch(self, id):
        data = request.get_json()
        user = User.query.filter(User.id == id).first()
        if not user:
            return {"error": "404: User not found"}, 404
        for attr in data:
            setattr(user, attr, data.get(attr))
        try:
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except:
            return {"error": "Unable to update user"}, 400

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return {"error": "404: User not found"}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204


# adding Communities and CommunitiesByID endpoint
class Communities(Resource):
    def get(self):
        communities = [
            community.to_dict() for community in Community.query.all()
        ]
        return communities, 200


class CommunitiesByID(Resource):
    def get(self, id):
        community = Community.query.filter(Community.id == id).first()
        if not community:
            return ({"error": "Community not found"}, 404)
        return community.to_dict(), 200


api.add_resource(Communities, "/api/communities")
api.add_resource(CommunitiesByID, "/communities/<int:id>")
api.add_resource(Games, "/games")
api.add_resource(GamesById, "/games/<int:id>")
api.add_resource(NewestGames, "/newest_games")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewsById, "/reviews/<int:id>")
api.add_resource(NewestReviews, "/newest_reviews")
api.add_resource(Users, "/users")
api.add_resource(UsersById, "/users/<int:id>")
api.add_resource(Home, "/", endpoint="home")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")
api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(Logout, "/api/logout", endpoint="logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
