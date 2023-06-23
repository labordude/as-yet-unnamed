from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
import datetime


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(created_at=db.Date, nullable=False)
    updated_at = db.Column(updated_at=db.Date)

    reviews = db.relationship('Review', back_populates='user')
    games = association_proxy('reviews', 'game')

    serialize_rules = ("-password_hash","-created_at","-updated_at")

    # @validates("username")
    # def validate_username(self, key, username):
    #     if not username or len(username) < 1:
    #         raise ValueError("User must have a username")
    #     return username

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Can't look at password hashes dumbass")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )

    def __repr__(self):
        return f"<User {self.username}"

    pass


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    background_image = db.Column(db.String)
    cover_image = db.Column(db.String, nullable=False)
    release_date = db.Column(db.Date, nullable=False)

    reviews = db.relationship('Review', back_populates="game")
    users = association_proxy('reviews', 'user')

    def __repr__(self):
        return f"<Game {self.title}" 


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(created_at=db.Date, nullable=False)
    updated_at = db.Column(updated_at=db.Date)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='reviews')

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    game = db.relationship('Game', back_populates='reviews')

    serialize_rules = ("-created_at", "-updated_at")
   