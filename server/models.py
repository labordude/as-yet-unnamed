from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column()
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)

    serialize_rules = ("-password_hash",)

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
