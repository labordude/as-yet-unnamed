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
from models import User
import requests


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


api.add_resource(Games, "/games")
api.add_resource(Home, "/", endpoint="home")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
