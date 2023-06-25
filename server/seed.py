from app import app
from random import randint
import csv
from models import db, Platform, User, Community, CommunityUser, Game, Review
from datetime import datetime

# db.init_app(app)


with app.app_context():
    print("Deleting existing platforms...")
    Platform.query.delete()
    print("Deleting existing games...")
    Game.query.delete()


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


def create_games(rows):
    with app.app_context():
        games = []
        for i in range(1, len(rows)):
            id = rows[i][0]
            title = rows[i][5]
            if rows[i][11]:
                description = rows[i][11]
            else:
                description = "No data"
            platform = rows[i][6]
            if rows[i][2]:
                background_image = rows[i][2]
            else:
                background_image = "https://placekitten.com/150/150"
            release_date = datetime.fromtimestamp(int(rows[i][3]))

            game = Game(
                id=id,
                title=title,
                description=description,
                platform=platform,
                background_image=background_image,
                release_date=release_date,
            )
            games.append(game)
        db.session.add_all(games)
        db.session.commit()
    return games


if __name__ == "__main__":
    print("Opening CSV...")
    with open("platforms.csv", newline="") as csvfile:
        rows = [
            row for row in csv.reader(csvfile, delimiter=",", quotechar="|")
        ]
        print("Seeding platforms...")
        platforms = create_platforms(rows)
        print("Complete!")

    print("opening games.csv")
    with open("games.csv", newline="") as csvfile:
        rows = [
            row for row in csv.reader(csvfile, delimiter=",", quotechar='"')
        ]
        print("Seeding games...")
        platforms = create_games(rows)
        print("Complete!")
