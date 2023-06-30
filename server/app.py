# app.py

from flask import (
    Flask,
    request,
    session,
    abort,
    flash,
    redirect,
    url_for,
    jsonify,
)
from flask_restful import Resource


# from flask_paginate import Pagination
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from config import db, api, app, login
from models import (
    User,
    Game,
    Review,
    Community,
    followers,
    CommunityUser,
    user_schema,
    users_schema,
    game_schema,
    games_schema,
    review_schema,
    reviews_schema,
    communities_schema,
    community_schema,
    user_community_schema,
    CommunityGame,
    game_communities_schema,
    ThreadSchema,
    threads_schema,
    thread_schema,
    CommentSchema,
    comment_schema,
    comments_schema,
    Thread,
    Comment,
    user_login_schema,
    users_login_schema,
)

from datetime import timezone, timedelta, datetime
import json
import datetime
from flask_login import (
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
    login_fresh,
)
import datetime
from flask import Blueprint, request, jsonify
from werkzeug import exceptions
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
)

bp_name = "exceptions"
bp = Blueprint(bp_name, __name__)


@bp.app_errorhandler(exceptions.InternalServerError)
def _handle_internal_server_error(ex):
    if request.path.startswith("/api/"):
        return jsonify(message=str(ex)), ex.code
    else:
        return ex


# user loader
@login.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))


@login_required
def create_session():
    login_user(user)


@login_required
def logout():
    logout_user()


class Login(Resource):
    def post(self):
        # session["user_id"] = 1
        # return {"message": ["successful login", session]}, 200
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                login_user(user)

                return user_schema.dump(user), 200

        return ({"error": "invalid login"}, 401)

    pass


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            session["user_id"] = None
            logout_user()
            return {"message": "logged out"}, 204

        return {"error": "401 unauthorized"}, 401

    def post(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            session["user_id"] = None
            logout_user()
            return {"message": "logged out"}, 204

        return {"error": "401 unauthorized"}, 401

    pass


@app.route("/api/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    if not login_fresh():
        login_user(user, remember=True)
    print("user logged in")
    return user_schema.dump(user), 200


# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             data = response.get_json()
#             if type(data) is dict:
#                 data["access_token"] = access_token
#                 response.data = json.dumps(data)
#         return response
#     except (RuntimeError, KeyError):
#         # if there is no valid JWT
#         return response


# class Token(Resource):
#     def post(self):
#         username = request.get_json()["username"]
#         password = request.get_json()["password"]

#         user = User.query.filter(User.username == username).first()
#         if user:
#             if user.authenticate(password):
#                 print("successful login")
#                 session["user_id"] = user.id
#                 print(f"successfully logged in: {user.id}")
#                 access_token = create_access_token(
#                     identity=user_schema.dump(user)
#                 )
#                 return (
#                     {
#                         "access_token": access_token,
#                         "user": user_schema.dump(user),
#                     }
#                 ), 200

#         return ({"error": "invalid login"}, 401)


class Following(Resource):
    def get(self, id):
        user_following = followers.query.filter(
            followers.c.followed_id == id
        ).all()
        if user_following is None:
            return ({"error": "Followings not found"}, 404)
        return user_following.to_dict(), 200


api.add_resource(Following, "/api/users/<int:id>/following")


# @app.route("/follow/<username>", methods=["POST"])


class Follow(Resource):
    method_decorators = [login_required]

    def post(self, username):
        # form = EmptyForm()
        # if form.validate_on_submit():
        # print(request.get_json()['username'])
        username = request.get_json()["username"]
        print(username)
        user = User.query.filter(User.username == username).first()
        print(user.username)
        if not user:
            return {"error": "User not found"}, 404
        # if user == current_user:
        #     flash("You cannot follow yourself!")
        #     return redirect(url_for("/api/users/<int:id>", username=username))
        current_user.follow(user)
        db.session.commit()
        user = User.query.filter(User.id == current_user.id).first()
        print("successful follow")
        # flash("You are following {}!".format(username))
        return user_schema.dump(user), 200

        # else:
        #     return redirect(url_for("/api/users/<int:id>"))


api.add_resource(Follow, "/api/follow/<string:username>")


# @app.route("/unfollow/<username>", methods=["POST"])
# @login_required
class UnFollow(Resource):
    method_decorators = [login_required]

    def post(self, username):
        # form = EmptyForm()
        # if form.validate_on_submit():
        print(request.get_json())
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()
        if not user:
            return {"error": "User not found"}, 404
        # if user == current_user:
        #     flash("You cannot follow yourself!")
        #     return redirect(url_for("/api/users/<int:id>", username=username))
        current_user.unfollow(user)
        db.session.commit()
        # flash("You are following {}!".format(username))
        return ({"message": "successfully unfollowed"}, 200)
        # else:
        #     return redirect(url_for("/api/users/<int:id>"))
        # else:
        #     return redirect(url_for("index"))


api.add_resource(UnFollow, "/api/unfollow/<string:username>")


class Home(Resource):
    method_decorators = [login_required]

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
        user_exists = User.query.filter(
            or_(User.email == email, User.username == username)
        ).first()
        if user_exists:
            return jsonify({"error": "User already exists"}, 409)
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
            login_user(new_user)
        except IntegrityError:
            return ({"error": "Unprocessable entry"}, 422)
        session["user_id"] = new_user.id
        login_user(new_user)
        return user_schema.dump(new_user), 201


# checks session for user
class CheckSession(Resource):
    def get(self):
        # please leave this code for testing purposes
        # if not session.get("user_id"):
        #     session["user_id"] = 1
        # user = User.query.filter(User.id == session["user_id"]).first()

        # return user_schema.dump(user), 200

        if session.get("user_id"):
            print(session["user_id"])

            user = User.query.filter(User.id == session["user_id"]).first()
            login_user(user)
            return user_schema.dump(user), 200

        return ({"error": "unauthorized"}, 401)

    pass


class Games(Resource):
    method_decorators = [login_required]

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
            "games": [
                game.to_dict(
                    only=(
                        "id",
                        "title",
                        "rating",
                        "release_date",
                        "description",
                        "background_image",
                        "platform",
                    )
                )
                for game in games.items
            ],
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
                rating=data.get("rating"),
                release_date=datetime.datetime.strptime(
                    data.get("release_date"), "%Y-%m-%d"
                ).date(),
            )
            db.session.add(new_game)
            db.session.commit()

            return game_schema.dump(new_game), 201

        except:
            return {"error": "400: Validation error"}, 400


class GamesById(Resource):
    method_decorators = [login_required]

    def get(self, id):
        game = Game.query.filter(Game.id == id).first()
        if not game:
            return {"error": "404: Game not found"}, 404

        return game_schema.dump(game), 200

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
    method_decorators = [login_required]

    def get(self):
        newest_games = [game for game in Game.query.limit(10).all()]
        return games_schema.dump(newest_games), 200


class Reviews(Resource):
    method_decorators = [login_required]

    def get(self):
        reviews = Review.query.all()
        return reviews_schema.dump(reviews), 200

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
                print(new_review)
                db.session.add(new_review)
                db.session.commit()
                print(new_review)
                return review_schema.dump(new_review), 201
            except:
                return {"error": "Unable to post review"}, 400
        return {"error": "401 Unauthorized"}, 401


class ReviewsById(Resource):
    method_decorators = [login_required]

    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        return review_schema.dump(review), 200

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
                review_schema.dump(review),
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
    method_decorators = [login_required]

    def get(self):
        # newest_reviews = [
        #     review_schema.dump(review)
        #     for review in Review.query.limit(10).all()
        # ]
        new_reviews = Review.query.limit(10).all()
        newest_reviews = []
        for i in range(len(new_reviews)):
            new_review = Game.query.filter(
                Game.id == new_reviews[i].game_id
            ).first()
            newest_reviews.append(new_review)
        return games_schema.dump(newest_reviews), 200


class Users(Resource):
    method_decorators = [login_required]

    def get(self):
        page = int(request.args.get("page", 1))
        per_page = 20
        total = User.query.count()
        users = User.query.order_by(User.created_at.desc())
        users = users.paginate()

        return {
            "users": [
                user_community_schema.dump(user) for user in users.items
            ],
            "total": users.total,
            "has_next": users.has_next,
            "has_prev": users.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200


class UsersById(Resource):
    method_decorators = [login_required]

    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return {"error": "404: User not found"}, 404
        return user_schema.dump(user), 200

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
            return user_schema.dump(user), 201
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
    method_decorators = [login_required]

    def get(self):
        communities = [community for community in Community.query.all()]
        return communities_schema.dump(communities), 200


class CommunitiesByID(Resource):
    method_decorators = [login_required]

    def get(self, id):
        community = Community.query.filter(Community.id == id).first()
        if not community:
            return ({"error": "Community not found"}, 404)
        return community_schema.dump(community), 200


# add routes for platform games?
class CommunityUsersByID(Resource):
    method_decorators = [login_required]

    def get(self, id):
        page = int(request.args.get("page", 1))
        per_page = 15

        users = User.query.join(
            CommunityUser, CommunityUser.user_id == User.id
        ).filter(CommunityUser.community_id == id)
        total = users.count()
        users = users.paginate()

        return {
            "users": [
                user_community_schema.dump(user) for user in users.items
            ],
            "total": total,
            "has_next": users.has_next,
            "has_prev": users.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200


class CommunityGamesByID(Resource):
    method_decorators = [login_required]

    def get(self, id):
        # gc = [
        #     game.game_id
        #     for game in CommunityGame.query.filter(
        #         CommunityGame.community_id == id
        #     ).all()
        # ]
        # unique = list(set(gc))
        # c_games = []
        # for i in range(len(unique)):
        #     game = Game.query.filter(Game.id == unique[i]).first()
        #     c_games.append(game)

        page = int(request.args.get("page", 1))
        per_page = 15

        games = Game.query.join(
            CommunityGame, CommunityGame.game_id == Game.id
        ).filter(CommunityGame.community_id == id)
        total = games.count()
        games = games.paginate()

        return {
            "games": [game_schema.dump(game) for game in games.items],
            "total": total,
            "has_next": games.has_next,
            "has_prev": games.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200
        return game_communities_schema.dump(c_games), 200


# class SearchGames(Resource):
#     def get(self):
#         searchedGames = Game.query.filter(Game.title.like("%title%")).all()
#         if not searchedGames:
#             return {"error": "Game not found"}, 404
#         return [
#                 game.to_dict(
#                     only=(
#                         "id",
#                         "title",
#                         "rating",
#                         "release_date",
#                         "description",
#                         "background_image",
#                         "platform",
#                         )
#                     )
#                     for game in searchedGames
#             ], 200


class SearchGames(Resource):
    def get(self, search):
        games = Game.query.filter(Game.title.like(f"%{search}%")).all()
        if games:
            return games_schema.dump(games), 200
        return {"message": "no games found"}


class SearchUsers(Resource):
    def get(self, search):
        users = User.query.filter(User.username.like(f"%{search}%")).all()
        if users:
            return users_login_schema.dump(users), 200
        return {"message": "no users found"}


class Threads(Resource):
    def get(self):
        threads = Thread.query.all()
        return threads_schema.dump(threads), 200


class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        return comments_schema.dump(comments), 200


class CommentsByThread(Resource):
    def get(self, id):
        comments = Comment.query.filter(Comment.thread_id == id).all()
        if not comments:
            return ({"error": "no comments on this thread"}, 200)
        return comments_schema(comments), 200


class ThreadsByCommunity(Resource):
    def get(self, id):
        threads = Thread.query.filter(Thread.community_id == id).all()
        if not threads:
            return ({"error": "no threads here yet"}), 404

        return threads_schema.dump(threads), 200


class ThreadByID(Resource):
    def get(self, id):
        thread = Thread.query.filter(Thread.id == id).first()
        if not thread:
            return ({"error": "no thread"}, 200)
        return thread_schema(thread), 200


api.add_resource(Threads, "/api/threads")
api.add_resource(ThreadByID, "/api/threads/<int:id>")
api.add_resource(ThreadsByCommunity, "/api/community_threads/<int:id>")
api.add_resource(Comments, "/api/comments")
api.add_resource(CommentsByThread, "/api/comments/<int:id>")

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
api.add_resource(CommunityUsersByID, "/api/community_users/<int:id>")
api.add_resource(CommunityGamesByID, "/api/community_games/<int:id>")
api.add_resource(SearchGames, "/api/search/<string:search>", endpoint="search")
api.add_resource(
    SearchUsers, "/api/search_users/<string:search>", endpoint="search_users"
)
# api.add_resource(CurrentUser, "/api/current_user")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
