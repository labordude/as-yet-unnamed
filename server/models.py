from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, UniqueConstraint
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt
import datetime

followers = db.Table(
    "followers",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    pfp_image = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(
        db.DateTime, server_default=db.func.now(), nullable=False
    )
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    active = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    followed = db.relationship(
        "User",
        secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref("followers", lazy="dynamic"),
        lazy="dynamic",
    )

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return (
            self.followed.filter(followers.c.followed_id == user.id).count()
            > 0
        )

    def followed_reviews(self):
        followed_reviews = Review.query.join(
            followers, (followers.c.followed_id == Review.user_id)
        ).filter(followers.c.follower_id == self.id)
        own_reviews = Review.query.filter_by(user_id=self.id)
        return followed_reviews.union(own_reviews).order_by(
            Review.created_at.desc()
        )

    reviews = db.relationship(
        "Review", back_populates="user", cascade="all,delete-orphan"
    )
    games = association_proxy("reviews", "game")

    community_users = db.relationship(
        "CommunityUser", back_populates="user", cascade="all,delete-orphan"
    )
    communities = association_proxy("community_users", "users")
    serialize_rules = (
        "-password_hash",
        "-created_at",
        "-updated_at",
        "-reviews.user",
        "-communities.user",
        "-community_users.user",
    )

    @validates("username")
    def validate_username(self, key, username):
        if not username or len(username) < 1:
            raise ValueError("User must have a username")
        return username

    @validates("name")
    def validate_name(self, key, name):
        if len(name) < 1:
            raise ValueError("Name must be at least 1 character")
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not email or "@" not in email:
            raise ValueError("Email must be a valid email address")
        return email

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


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    platform = db.Column(db.String, nullable=False)
    page_banner = db.Column(db.String)
    background_image = db.Column(db.String, nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship(
        "Review", back_populates="game", cascade="all,delete-orphan"
    )
    users = association_proxy("reviews", "user")

    game_platforms = db.relationship("PlatformGames", back_populates="game")
    platforms = association_proxy("game_platforms", "game")
    game_communities = db.relationship("CommunityGame", back_populates="game")
    communities = association_proxy("game_communities", "community")
    serialize_rules = (
        "-reviews.game",
        "-updated_at",
        "-platforms.game",
        "-game_platforms.game",
        "-game_communities.game",
        "-game_communities.community.platforms",
    )

    @validates("title")
    def validate_title(self, key, title):
        if not title or title in ("games.title") or len(title) < 1:
            raise ValueError("Invalid title")
        return title

    @validates("description")
    def validate_description(self, key, description):
        if not description or len(description) < 1:
            raise ValueError("Invalid description")
        return description

    @validates("background_image")
    def validate_cover_image(self, key, cover_image):
        if not cover_image:
            raise ValueError("Missing cover image")
        return cover_image

    @validates("release_date")
    def validate_release_date(self, key, release_date):
        if not release_date or not isinstance(release_date, datetime.date):
            raise ValueError("Game release date must be a date")
        return release_date

    def __repr__(self):
        return f"<Game {self.title}"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    __table_args__ = (UniqueConstraint("user_id", "game_id"),)

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime, server_default=db.func.now(), nullable=False
    )
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="reviews")

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    game = db.relationship("Game", back_populates="reviews")

    serialize_rules = (
        "-created_at",
        "-updated_at",
        "-user.reviews",
        "-game.reviews",
    )

    @validates("user_id")
    def validate_user(self, key, user_id):
        if not user_id or not isinstance(user_id, int):
            raise ValueError("Invalid user_id")
        return user_id

    @validates("game_id")
    def validate_game(self, key, game_id):
        if not game_id or not isinstance(game_id, int):
            raise ValueError("Invalid game_id")
        return game_id

    @validates("body")
    def validate_body(self, key, body):
        if not body or len(body) < 1:
            raise ValueError("Length of review must be at least 1 character")
        return body

    @validates("rating")
    def validate_rating(self, key, rating):
        if (
            not rating
            or not isinstance(rating, int)
            or not (0 <= rating <= 10)
        ):
            raise ValueError("Rating must be value between 0 and 10")
        return rating


class Community(db.Model, SerializerMixin):
    __tablename__ = "communities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    community_games = db.relationship(
        "CommunityGame", back_populates="community"
    )
    games = association_proxy("community_games", "game")
    community_users = db.relationship(
        "CommunityUser",
        back_populates="community",
        cascade="all,delete-orphan",
    )
    users = association_proxy("community_users", "user")
    platforms = db.relationship(
        "PlatformCommunity", back_populates="community"
    )
    serialize_rules = (
        "-community_users.community",
        "-community_games.community",
        "-platforms.community",
    )


class CommunityUser(db.Model, SerializerMixin):
    __tablename__ = "community_users"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer, db.ForeignKey("communities.id"), nullable=False
    )
    community = db.relationship("Community", back_populates="community_users")

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="community_users")

    serialize_rules = ("-user.community_users", "-community.community_users")


class Platform(db.Model, SerializerMixin):
    __tablename__ = "platforms"

    id = db.Column(db.Integer, primary_key=True)
    platform_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    alternative_name = db.Column(db.String)
    platform_logo = db.Column(db.String)
    slug = db.Column(db.String)
    url = db.Column(db.String)
    generation = db.Column(db.Integer)
    platform_family = db.Column(db.Integer)
    abbreviation = db.Column(db.String)
    communities = db.relationship(
        "PlatformCommunity", back_populates="platform"
    )
    platform_games = db.relationship(
        "PlatformGames", back_populates="platform"
    )
    games = association_proxy("platform_games", "game")

    serialize_rules = ("-platform_games.platform", "-communities.platform")


class PlatformGames(db.Model, SerializerMixin):
    __tablename__ = "platform_games"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    game = db.relationship("Game", back_populates="game_platforms")

    platform_id = db.Column(
        db.Integer, db.ForeignKey("platforms.id"), nullable=False
    )
    platform = db.relationship("Platform", back_populates="platform_games")

    serialize_rules = ("-game.game_platforms", "-platform.platform_games")


class PlatformCommunity(db.Model, SerializerMixin):
    __tablename__ = "platform_communities"

    id = db.Column(db.Integer, primary_key=True)
    platform_id = db.Column(
        db.Integer, db.ForeignKey("platforms.id"), nullable=False
    )
    community_id = db.Column(
        db.Integer, db.ForeignKey("communities.id"), nullable=False
    )
    platform = db.relationship("Platform", back_populates="communities")
    community = db.relationship("Community", back_populates="platforms")

    serialize_rules = ("-community.platforms", "-platform.communities")


class CommunityGame(db.Model, SerializerMixin):
    __tablename__ = "community_games"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    community_id = db.Column(
        db.Integer, db.ForeignKey("communities.id"), nullable=False
    )
    game = db.relationship("Game", back_populates="game_communities")
    community = db.relationship("Community", back_populates="community_games")

    serialize_rules = ("-community.community_games", "-game.game_communities")


# class Thread(db.Model, SerializerMixin):
#     __tablename__ = "threads"
#     id = db.Column(db.Integer, primary_key=True)
