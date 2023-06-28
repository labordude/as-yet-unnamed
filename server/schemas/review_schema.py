from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, UniqueConstraint
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt, ma
from app import GameSchema
import datetime


class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        include_fk = True
        fields = ("id", "body", "rating", "_links")
        game = ma.Nested(GameSchema)
        _links = ma.Hyperlinks(
            {
                "self": ma.URLFor("reviews", values=dict(id="<id>")),
                "collection": ma.URLFor("reviews"),
            }
        )


review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)
