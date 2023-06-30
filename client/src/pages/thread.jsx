import React, {useState, useEffect} from "react";
import {useLoaderData} from "react-router-dom";
import {getThreadComments} from "../features/ui/helpers";
import {Container, Divider, Icon, Image} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
import Comment from "../features/threads/discussion-card";
import {ChatIcon} from "@chakra-ui/icons";
export async function loader({params}) {
  const comments = await getThreadComments(params.id);
  return {comments};
}
function formatDate(dateString) {
  let inputDate = Date.parse(dateString);
  const date = new Date(inputDate);

  return date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
}
export default function Thread() {
  const [commentData, setCommentData] = useState([]);
  const {comments} = useLoaderData();
  const colors = [
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error",
  ];
  useEffect(() => {
    setCommentData(comments);
  });
  return (
    <>
      <div className="w-full mx-auto border-2 bg-charcoal">
        <div className="w-[80%] mx-auto flex h-full mt-4  my-auto">
          <div className="flex h-full bg-lightgray w-2/3 my-auto">
            <div className="w-12 h-[100%]  justify-center items-center flex flex-col my-auto ml-4">
              <div>
                <Icon as={BiSolidUpArrowSquare} h={6} w={6} />
              </div>
              <div className="">{comments.likes}</div>
              <div>
                <Icon as={BiSolidDownArrowSquare} h={6} w={6} />
              </div>
            </div>
            <div className="flex flex-col ml-8 justify-center w-full">
              <div className="text-2xl">{comments.title}</div>
              <span className="text-sm text-playstation_blue">
                Started on {formatDate(comments.created_at)}
              </span>
              <div className="text-md">{comments.description}</div>
              <div className="text-md flex">
                <ChatIcon className="mr-2" />
                {"  "} {`${comments.comments.length}`} comments
              </div>
            </div>
            <Divider />
          </div>
          <div className="flex flex-col h-full bg-charcoal w-1/3 items-baseline justify-start align-top pt-2">
            <div className="bg-white justify-center items-center mx-auto my-auto align-middle">
              <Image
                src={`/images/${comments.community}.svg`}
                h={14}
                className="mx-auto my-auto"
                borderRadius={4}
              />
            </div>
            <div className="stats shadow p-0 bg-charcoal mx-auto">
              <div className="stat place-items-center p-2">
                <div className="stat-title text-secondary">Users</div>
                <div className="stat-value text-secondary">4,200</div>
                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
              </div>

              <div className="stat place-items-center p-2">
                <div className="stat-title text-lightgray">New Registers</div>
                <div className="stat-value text-lightgray">1,200</div>
                <div className="stat-desc text-lightgray">↘︎ 90 (14%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto border-2 bg-charcoal">
        <div className="w-[80%] mx-auto flex h-full my-auto">
          <div className="flex flex-col flex-wrap h-full  w-2/3 my-auto">
            {comments.comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
          <div className="flex flex-col h-full bg-charcoal w-1/3 items-baseline justify-start align-top pt-2">
            <div className="bg-white justify-center items-center mx-auto my-auto align-middle bg-charcoal"></div>
            <div className="stats shadow p-0 bg-charcoal mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}
