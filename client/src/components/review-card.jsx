import React from "react";
import {Image, Icon} from "@chakra-ui/react";
import {FaHeart, FaRegComments} from "react-icons/fa";

export default function ReviewCard({review, game}) {
  return (
    <div className="w-full border-2 flex flex-col px-2">
      <div className="font-bold text-lg" style={{marginTop:"5px", marginBottom:"10px"}}>
        {game.title}{" "}
        <span className="font-medium text-sm" style={{marginLeft:"20px"}}>
          {game.release_date.slice(0, 4)}
        </span>
      </div>
      <div className="flex flex-row align-top items-start justify-start">
        <div className="justify-start align-top items-start" style={{marginBottom:"10px"}}>
          <Image w="250px" src={game.background_image} />
        </div>
        <div className="flex flex-col ml-2">
          {/* <div className="text-sm font-bold">{review.user.username}</div> */}
          <div className="text-sm font-bold" style={{marginBottom:"5px"}}>{review.rating} / 10</div>
          <div className="text-sm" style={{marginBottom:"10px"}}>{review.body}</div>
          <div className="text-sm">
            <Icon as={FaHeart} />
            Likes <Icon as={FaRegComments} />2 See full review
          </div>
        </div>
      </div>
    </div>
  );
}
