import React, {useState, useEffect} from "react";
import {likeComment, unlikeComment} from "../ui/helpers";
import {Container, Box, Icon, VStack, StackDivider} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
import {ChatIcon} from "@chakra-ui/icons";
export default function Comment({comment}) {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    setCommentData(comment);
  }, []);
  function formatDate(dateString) {
    let inputDate = Date.parse(dateString);
    const date = new Date(inputDate);

    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  }

  function handleLikeComment() {
    likeComment(comment.id).then(moreLikes => {
      console.log(moreLikes);
      setCommentData(moreLikes);
    });
  }
  function handleUnlikeComment() {
    unlikeComment(comment.id).then(lessLikes => {
      console.log(lessLikes);
      setCommentData(lessLikes);
    });
  }
  const colors = [
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[Math.ceil(Math.random() * colors.length)];
  return (
    <>
      <div className="flex flex-col ml-8 justify-center w-[95%]">
        <span className="text-sm text-playstation_blue">
          Started on {formatDate(comment.created_at)}
        </span>
        <div className="chat chat-start">
          <div className={`chat-bubble chat-bubble-${randomColor}`}>
            {comment.description}
          </div>
        </div>

        <div className="flex my-auto gap-4">
          <div>
            <Icon
              as={BiSolidUpArrowSquare}
              h={6}
              w={6}
              color={"white"}
              onClick={handleLikeComment}
            />
          </div>
          <div className="text-lightgray">{commentData.likes}</div>
          <div>
            <Icon
              as={BiSolidDownArrowSquare}
              h={6}
              w={6}
              color={"white"}
              onClick={handleUnlikeComment}
            />
          </div>
          {/* <div className="text-md flex ml-4 my-auto">
            <ChatIcon className="mr-2" color={"white"} />
          </div> */}
        </div>
      </div>
    </>
  );
}
