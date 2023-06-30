from app import app
from random import randint
import csv
from models import (
    db,
    Platform,
    User,
    Community,
    CommunityUser,
    Game,
    Review,
    PlatformCommunity,
    PlatformGames,
    CommunityGame,
    Thread,
    Comment,
    followers,
)
from datetime import datetime
from faker import Faker
import ast
from sqlalchemy import insert, engine

# db.init_app(app)
fake = Faker()

with app.app_context():
    # print("Deleting existing platforms...")
    # Platform.query.delete()
    # print("Deleting existing games...")
    Game.query.delete()
    Community.query.delete()

# def create_users():
#     with app.app_context():
#         users = []
#         usernames = [fake.unique.user_name() for i in range(50)]
#         for i in range(50):
#             password = fake.password(
#                 length=10,
#                 special_chars=True,
#                 upper_case=True,
#                 lower_case=True,
#                 digits=True,
#             )
#             user = User(
#                 name=fake.name(),
#                 username=usernames[i],
#                 email=fake.email(),
#                 bio=fake.paragraph(nb_sentences=3, variable_nb_sentences=True),
#                 pfp_image="https://placekitten.com/150/150",
#             )
#             user.password_hash = password
#             users.append(user)
#         db.session.add_all(users)
#         db.session.commit()
#     return users


def create_reviews():
    with app.app_context():
        Review.query.delete()
        # CommunityUser.query.delete()
        users = [user.id for user in User.query.all()]
        games = [game.id for game in Game.query.all()]

        reviews = []
        # community_users = []
        for i in range(500):
            game_id = fake.random_element(elements=games)
            user_id = fake.random_element(elements=users)
            review = Review(
                body=fake.paragraph(
                    nb_sentences=5, variable_nb_sentences=False
                ),
                rating=fake.random_int(min=1, max=5),
                user_id=user_id,
                game_id=game_id,
            )
            reviews.append(review)

            # platforms = [
            #     game.platform for game in Game.query.filter(Game.id == game_id)
            # ]
            # platforms = ",".join(str(e) for e in platforms)
            # platforms_list = [platform for platform in platforms.split(",")]
            # for j in range(len(platforms_list)):
            #     pc = PlatformCommunity.query.filter(
            #         PlatformCommunity.platform_id == platforms_list[j]
            #     ).first()
            #     print(pc.community_id)
            #     cu = CommunityUser(
            #         community_id=pc.community_id, user_id=user_id
            #     )
            #     community_users.append(cu)
        db.session.add_all(reviews)
        # db.session.add_all(community_users)
        db.session.commit()
    return reviews


def create_communities():
    with app.app_context():
        Community.query.delete()
        community_list = [
            {
                "name": "Playstation",
                "image": "/images/playstation_logo.svg",
            },
            {"name": "Nintendo", "image": "/images/nintendo_logo.svg"},
            {"name": "XBox", "image": "/images/xbox_logo.svg"},
            {"name": "PC", "image": "/images/pc_gaming.svg"},
            {"name": "Mobile", "image": "/images/mobile_gaming.png"},
            {"name": "Other", "image": "/images/nothing.png"},
        ]

        for i in range(len(community_list)):
            community = Community(
                name=community_list[i]["name"],
                image=community_list[i]["image"],
            )
            db.session.add(community)
            db.session.commit()


def create_platforms(rows):
    with app.app_context():
        platforms = []
        for i in range(1, len(rows)):
            platform = Platform(
                platform_id=rows[i][0],
                name=rows[i][1],
                alternative_name=rows[i][2],
                platform_logo=rows[i][3],
                slug=rows[i][4],
                url=rows[i][5],
                generation=rows[i][6],
                platform_family=rows[i][7],
                abbreviation=rows[i][8],
            )
            platforms.append(platform)
        db.session.add_all(platforms)
        db.session.commit()
    return platforms


def create_platform_communities(rows):
    with app.app_context():
        PlatformCommunity.query.delete()
        platform_communities = []
        for i in range(1, len(rows)):
            platform_community = PlatformCommunity(
                platform_id=rows[i][0],
                community_id=rows[i][1],
            )
            platform_communities.append(platform_community)
        db.session.add_all(platform_communities)
        db.session.commit()


def create_games(rows):
    with app.app_context():
        Game.query.delete()
        PlatformGames.query.delete()

        games = []
        for i in range(1, len(rows)):
            id = rows[i][0]
            title = rows[i][5]
            if rows[i][11]:
                description = rows[i][11]
            else:
                print("found no description")
                description = "No data"
            platform = ast.literal_eval(rows[i][6])
            platforms = [item["id"] for item in platform]
            platform_list = ",".join([str(item["id"]) for item in platform])

            if rows[i][2]:
                image_dict = ast.literal_eval(rows[i][2])
                big_picture = image_dict["url"].replace("thumb", "720p")
                background_image = f"https:{big_picture}"
            else:
                background_image = "https://placekitten.com/150/150"
            release_date = datetime.fromtimestamp(int(rows[i][3]))
            rating = rows[i][12]
            game = Game(
                id=id,
                title=title,
                description=description,
                platform=platform_list,
                background_image=background_image,
                release_date=release_date,
                rating=rating,
            )

            db.session.add(game)

            db.session.commit()
            # print(game.id)
            for j in range(len(platforms)):
                community = PlatformCommunity.query.filter(
                    PlatformCommunity.platform_id == platforms[j]
                ).first()
                if not community:
                    c_id = 6
                else:
                    c_id = community.community_id
                game_community = CommunityGame(
                    game_id=game.id, community_id=c_id
                )

                db.session.add(game_community)
                db.session.commit()
            # print(
            #     game_platform.id,
            #     game_platform.game_id,
            #     game_platform.platform_id,
            # )
    return games


def create_threads():
    with app.app_context():
        Comment.query.delete()
        Thread.query.delete()

        communities = [community.id for community in Community.query.all()]
        users = [user.id for user in User.query.all()]
        threads = []
        for i in range(250):
            thread = Thread(
                community_id=fake.random_element(elements=communities),
                user_id=fake.random_element(elements=users),
                title=fake.sentence(nb_words=8, variable_nb_words=True),
                description=fake.paragraph(
                    nb_sentences=4, variable_nb_sentences=True
                ),
                likes=fake.random_int(min=0, max=100),
            )
            threads.append(thread)
        db.session.add_all(threads)
        db.session.commit()


def create_comments():
    with app.app_context():
        Comment.query.delete()

        threads = [thread.id for thread in Thread.query.all()]
        users = [user.id for user in User.query.all()]
        comments = []
        for i in range(1500):
            comment = Comment(
                thread_id=fake.random_element(elements=threads),
                user_id=fake.random_element(elements=users),
                description=fake.paragraph(
                    nb_sentences=4, variable_nb_sentences=True
                ),
                likes=fake.random_int(min=0, max=100),
            )
            comments.append(comment)
        db.session.add_all(comments)
        db.session.commit()


if __name__ == "__main__":
    # print("loading users")
    # create_users()
    # print("users loaded")
    #  print("loading communities")
    # create_communities()
    # print("communities loaded")
    # print("Opening CSV...")
    # with open("platform_communities.csv", newline="") as csvfile:
    #     rows = [
    #         row for row in csv.reader(csvfile, delimiter=",", quotechar='"')
    #     ]
    #     print("Seeding platform communities...")
    #     platform_communities = create_platform_communities(rows)
    #     print("Complete!")

    # print("opening games.csv")
    # with open("games.csv", newline="") as csvfile:
    #     rows = [
    #         row for row in csv.reader(csvfile, delimiter=",", quotechar='"')
    #     ]
    #     print("Seeding games...")
    #     games = create_games(rows)
    #     print("Complete!")

    # print("loading reviews")
    # create_reviews()
    # print("reviews loaded")

    # print("loading threads")
    # create_threads()
    # print("threads loaded")

    # print("loading comments")
    # create_comments()
    # print("comments loaded")

    # print("loading comments")
    create_followers()
    # print("comments loaded")
