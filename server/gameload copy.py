import os
import sys
import csv
import time
import json
import yaml

# import numpy as np
from igdb.wrapper import IGDBWrapper

with open("config.yml", "r") as ymlfile:
    cfg = yaml.load(ymlfile, Loader=yaml.SafeLoader)

LIMIT = cfg["limit"]


def get_games(last, wrap):
    options = "fields id,name,platforms,release_dates,slug; limit {0}; offset {1};".format(
        LIMIT, last
    )
    print("last was {0}".format(last))
    time.sleep(1)
    # return wrap.api_request("games", options)
    print(wrap.api_request("games", options))


def make_list(end: int = 10):
    last = 0
    wrapper = IGDBWrapper(cfg["user"], cfg["token"])

    with open(
        os.path.join(os.getcwd(), "game_titles.csv"),
        "w",
        newline="",
        encoding="utf-8",
    ) as myfile:
        wr = csv.writer(myfile)
        fields = ("name", "platforms", "release_dates", "slug")
        wr.writerow(fields)
        for last in range(0, end, LIMIT):
            # name = last["name"] if last["name"] else None
            # platforms = last["platforms"] if last["platforms"] else None
            # slug = last["slug"] if last["slug"] else None
            # release_dates = (
            #     last["release_date"] if last["release_date"] else None
            # )

            # wr.writerows(
            #     [
            #         item["name"],
            #     ]
            #     for item in json.loads(
            #         get_games(last, wrapper).decode("utf-8").replace("'", '"')
            #     )
            # )
            print(
                [
                    item
                    for item in json.loads(
                        get_games(last, wrapper)
                        .decode("utf-8")
                        .replace("'", '"')
                    )
                ]
            )


if __name__ == "__main__":
    if len(sys.argv) > 1:
        make_list(int(sys.argv[1]))
    else:
        make_list()
