import React, {useState, useEffect} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {Container, Box, Icon, VStack, StackDivider} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
import {likeThread, unlikeThread} from "../ui/helpers";
export default function Thread({thread}) {
  const [threadData, setThreadData] = useState([]);

  useEffect(() => {
    setThreadData(thread);
  }, []);
  function formatDate(dateString) {
    let inputDate = Date.parse(dateString);
    const date = new Date(inputDate);

    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  }

  function handleLikeThread() {
    likeThread(thread.id).then(moreLikes => {
      console.log(moreLikes);
      setThreadData(moreLikes);
    });
  }
  function handleUnlikeThread() {
    unlikeThread(thread.id).then(lessLikes => {
      console.log(lessLikes);
      setThreadData(lessLikes);
    });
  }
  return (
    <div className="mt-4 p-2 border-2 flex max-h-22">
      <div className="flex flex-col">
        {/* <div></div>
                <div>comments</div>
                <div>downarrow</div> */}
        <div className="align-middle justify-center">
          <div>
            <Icon
              as={BiSolidUpArrowSquare}
              h={6}
              w={6}
              onClick={handleLikeThread}
            />
          </div>
          <div className="text-center">{threadData.likes}</div>
          <div>
            <Icon
              as={BiSolidDownArrowSquare}
              h={6}
              w={6}
              onClick={handleUnlikeThread}
            />
          </div>
        </div>
      </div>
      <Link to={`/threads/${thread.id}`} key={thread.id}>
        <div className="flex flex-col ml-8 justify-center">
          <div className="text-2xl">{thread.title}</div>
          <span className="text-sm text-playstation_blue">
            Started on {formatDate(thread.created_at)}
          </span>
        </div>
      </Link>
    </div>
  );
}
