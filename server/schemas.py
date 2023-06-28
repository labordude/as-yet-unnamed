##### SCHEMAS #####


class PlatformSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Platform
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("id", "platform_id", "name", "slug", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("platform", values=dict(id="<id>")),
            "collection": ma.URLFor("platforms"),
        }
    )


platform_schema = PlatformSchema()
platforms_schema = PlatformSchema(many=True)


class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = (
            "title",
            "description",
            "platform",
            "page_banner",
            "background_image",
            "release_date",
            "updated_at",
            "rating",
            "_links",
        )

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("game", values=dict(id="<id>")),
            "collection": ma.URLFor("games"),
        }
    )


game_schema = GameSchema()
games_schema = GameSchema(many=True)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True
        # show these
        fields = (
            "id",
            "username",
            "name",
            "email",
            "bio",
            "active",
            "is_admin",
            "_links",
        )

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("profile", values=dict(id="<id>")),
            "collection": ma.URLFor("users"),
        }
    )


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("id", "body", "rating", "_links")

        _links = ma.Hyperlinks(
            {
                "self": ma.URLFor("review", values=dict(id="<id>")),
                "collection": ma.URLFor("reviews"),
            }
        )


review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


class CommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Community
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("name", "image", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("community", values=dict(id="<id>")),
            "collection": ma.URLFor("communities"),
        }
    )


community_schema = CommunitySchema()
communities_schema = CommunitySchema(many=True)


class CommunityUserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = CommunityUser
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("community_id", "user_id", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("community_user", values=dict(id="<id>")),
            "collection": ma.URLFor("community_users"),
        }
    )


community_user_schema = CommunityUserSchema()
community_users_schema = CommunityUserSchema(many=True)


class PlatformGameSchema(ma.SQLAlchemySchema):
    class Meta:
        model = PlatformGames
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("platform_id", "game_id", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("platform_game", values=dict(id="<id>")),
            "collection": ma.URLFor("platform_games"),
        }
    )


platform_game_schema = PlatformGameSchema()
platform_games_schema = PlatformGameSchema(many=True)


class PlatformCommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = PlatformCommunity
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("platform_id", "community_id", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("platform_community", values=dict(id="<id>")),
            "collection": ma.URLFor("platform_communities"),
        }
    )


platform_community_schema = PlatformCommunitySchema()
platform_communities_schema = PlatformCommunitySchema(many=True)


class CommunityGameSchema(ma.SQLAlchemySchema):
    class Meta:
        model = CommunityGame
        load_instance = True
        sqla_session = db.session
        include_fk = True
        fields = ("community_id", "game_id", "_links")

    _links = ma.Hyperlinks(
        {
            "self": ma.URLFor("community_game", values=dict(id="<id>")),
            "collection": ma.URLFor("community_games"),
        }
    )


community_game_schema = CommunityGameSchema()
community_games_schema = CommunityGameSchema(many=True)
