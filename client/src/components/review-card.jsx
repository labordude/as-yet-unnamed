import React from "react";
import {Image, Icon} from "@chakra-ui/react";
import {FaHeart, FaRegComments} from "react-icons/fa";
export default function ReviewCard({review, game}) {
  return (
    <div className="w-full border-2 flex flex-col px-2">
      <div className="font-bold text-lg">
        {game.title ? game.title : review.game.title}{" "}
        <span className="font-medium text-sm">
          {game.release_date.slice(0, 4)
            ? game.release_date.slice(0, 4)
            : review.game.release_date.slice(0, 4)}
        </span>
      </div>
      <div className="flex flex-row align-top items-start justify-start">
        <div className="justify-start align-top items-start">
          <Image
            w="250px"
            src={
              review.user.pfp_image
                ? review.user.pfp_image
                : game.background_image
            }
          />
        </div>
        <div className="flex flex-col ml-2">
          <div className="text-sm font-bold">{review.user.username}</div>
          <div className="text-sm font-bold">{review.rating} / 10</div>
          <div className="text-sm">{review.body}</div>
          <div className="text-sm">
            <Icon as={FaHeart} />
            Likes <Icon as={FaRegComments} />2 See full review
          </div>
        </div>
      </div>
    </div>
  );
}
