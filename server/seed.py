from app import app
from random import randint
import csv
from models import db, Platform, User, Community, CommunityUser, Game, Review
from datetime import datetime
from faker import Faker
import ast

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


# def create_reviews():
#     with app.app_context():
#         users = [user.id for user in User.query.all()]
#         games = [game.id for game in Game.query.all()]
#         reviews = []

#         for i in range(500):
#             review = Review(
#                 body=fake.paragraph(
#                     nb_sentences=5, variable_nb_sentences=False
#                 ),
#                 rating=fake.random_int(min=1, max=10),
#                 user_id=fake.random_element(elements=users),
#                 game_id=fake.random_element(elements=games),
#             )
#             reviews.append(review)
#         db.session.add_all(reviews)
#         db.session.commit()
#     return reviews


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
        ]

        for i in range(len(community_list)):
            community = Community(
                name=community_list[i]["name"],
                image=community_list[i]["image"],
            )
            db.session.add(community)
            db.session.commit()


# def create_platforms(rows):
#     with app.app_context():
#         platforms = []
#         for i in range(1, len(rows)):
#             platform = Platform(
#                 platform_id=rows[i][0],
#                 name=rows[i][1],
#                 alternative_name=rows[i][2],
#                 platform_logo=rows[i][3],
#                 slug=rows[i][4],
#                 url=rows[i][5],
#                 generation=rows[i][6],
#                 platform_family=rows[i][7],
#                 abbreviation=rows[i][8],
#             )
#             platforms.append(platform)
#         db.session.add_all(platforms)
#         db.session.commit()
#     return platforms


def create_games(rows):
    with app.app_context():
        Game.query.delete()
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
            print([item["id"] for item in platform])
            if rows[i][2]:
                image_dict = ast.literal_eval(rows[i][2])
                big_picture = image_dict["url"].replace("thumb", "720p")
                background_image = f"https:{big_picture}"
            else:
                background_image = "https://placekitten.com/150/150"
            release_date = datetime.fromtimestamp(int(rows[i][3]))

    #         game = Game(
    #             id=id,
    #             title=title,
    #             description=description,
    #             platform=platform,
    #             background_image=background_image,
    #             release_date=release_date,
    #         )
    #         games.append(game)
    #     db.session.add_all(games)
    #     db.session.commit()
    # return games


if __name__ == "__main__":
    # print("loading users")
    # create_users()
    # print("users loaded")

    print("opening games.csv")
    with open("games.csv", newline="") as csvfile:
        rows = [
            row for row in csv.reader(csvfile, delimiter=",", quotechar='"')
        ]
        print("Seeding games...")
        games = create_games(rows)
        print("Complete!")

    print("loading communities")
    create_communities()
    print("communities loaded")

    # print("loading reviews")
    # create_reviews()
    # print("reviews loaded")

    # print("Opening CSV...")
    # with open("platforms.csv", newline="") as csvfile:
    #     rows = [
    #         row for row in csv.reader(csvfile, delimiter=",", quotechar="|")
    #     ]
    #     print("Seeding platforms...")
    #     platforms = create_platforms(rows)
    #     print("Complete!")
