# app.py

import os
from dotenv import load_dotenv

load_dotenv()
from flask import Flask, request, session, abort, flash, redirect, url_for
from flask_migrate import Migrate
from flask_restful import Resource
from flask_cors import CORS

# from flask_paginate import Pagination
from sqlalchemy.exc import IntegrityError
from config import db, api, app
from models import User, Game, Review, Community, followers
import requests
import datetime
from flask_login import LoginManager
from flask_login import UserMixin
from flask_login import current_user
from flask_login import login_required
from flask_login import login_user
from flask_login import logout_user
from flask_wtf import FlaskForm
from wtforms import SubmitField

# import jsonify


class Following(Resource):
    def get(self, id):
        user_following = followers.query.filter(
            followers.c.followed_id == id
        ).all()
        if user_following is None:
            return ({"error": "Followings not found"}, 404)
        return user_following.to_dict(), 200


api.add_resource(Following, "/api/users/<int:id>/following")


@app.route("/follow/<username>", methods=["POST"])
@login_required
def follow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter(User.username == username).first()
        if not user:
            flash("User {} not found.".format(username))
            return redirect(url_for("/api/users/<int:id>"))
        if user == current_user:
            flash("You cannot follow yourself!")
            return redirect(url_for("/api/users/<int:id>", username=username))
        current_user.follow(user)
        db.session.commit()
        flash("You are following {}!".format(username))
        return redirect(url_for("/api/users/<int:id>", username=username))
    else:
        return redirect(url_for("/api/users/<int:id>"))


@app.route("/unfollow/<username>", methods=["POST"])
@login_required
def unfollow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter(User.username == username).first()
        if not user:
            flash("User {} not found.".format(username))
            return redirect(url_for("/api/users/<int:id>"))
        if user == current_user:
            flash("You cannot unfollow yourself!")
            return redirect(url_for("user", username=username))
        current_user.unfollow(user)
        db.session.commit()
        flash("You are not following {}.".format(username))
        return redirect(url_for("user", username=username))
    else:
        return redirect(url_for("index"))


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
        pfp_image = data.get("pfp_image")
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
        # please leave this code for testing purposes
        session["user_id"] = 1
        user = (
            User.query.filter(User.id == session.get("user_id"))
            .first()
            .to_dict()
        )
        return user, 200

        # if session.get("user_id"):
        #     print(session["user_id"])
        #     user = (
        #         User.query.filter(User.id == session.get("user_id"))
        #         .first()
        #         .to_dict()
        #     )
        #     return user, 200

        # return ({"error": "unauthorized"}, 401)

    pass


# class CurrentUser(Resource):
#     def get(self):

#         user = User.query.filter(User.id == session.get("user_id")).first().to_dict()
#         return user, 200


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
        page = int(request.args.get("page", 1))
        per_page = 15
        total = Game.query.count()
        games = Game.query.order_by(Game.release_date.desc())
        games = games.paginate()

        return {
            "games": [game.to_dict() for game in games.items],
            "total": games.total,
            "has_next": games.has_next,
            "has_prev": games.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200

    def post(self):
        data = request.get_json()
        try:
            new_game = Game(
                title=data.get("title"),
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
                        "title",
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
        game = Game.query.filter(Game.id == id).first()
        if not game:
            return {"error": "404: Game not found"}, 404

        return game.to_dict(), 200

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
                        "title",
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
        newest_games = [
            game.to_dict()
            for game in Game.query.order_by(Game.release_date.desc())
            .limit(10)
            .all()
        ]
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
        if session.get("user_id"):
            data = request.get_json()
            try:
                new_review = Review(
                    body=data.get("review"),
                    rating=data.get("rating"),
                    user_id=session.get("user_id"),
                    game_id=data.get("game_id"),
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
                        )
                    ),
                    201,
                )
            except:
                return {"error": "Unable to post review"}, 400
        return {"error": "401 Unauthorized"}, 401


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


# add routes for platform games?


api.add_resource(Communities, "/api/communities")
api.add_resource(CommunitiesByID, "/api/communities/<int:id>")
api.add_resource(Games, "/api/games")
api.add_resource(GamesById, "/api/games/<int:id>")
api.add_resource(NewestGames, "/api/newest_games")
api.add_resource(Reviews, "/api/reviews")
api.add_resource(ReviewsById, "/api/reviews/<int:id>")
api.add_resource(NewestReviews, "/api/newest_reviews")
api.add_resource(Users, "/api/users")
api.add_resource(UsersById, "/api/users/<int:id>")
api.add_resource(Home, "/", endpoint="home")
api.add_resource(Signup, "/api/signup", endpoint="signup")
api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")
api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(Logout, "/api/logout", endpoint="logout")
# api.add_resource(CurrentUser, "/api/current_user")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
