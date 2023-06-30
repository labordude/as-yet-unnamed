import React, {useState, useEffect} from "react";
import {
  getCommunities,
  getCommunityThreads,
  likeThread,
  unlikeThread,
} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {Container, Box, Icon, VStack, StackDivider} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
import ThreadCard from "../features/communities/thread-card";
export async function loader({params}) {
  const threads = await getCommunityThreads(params.id);
  return {threads};
}
export default function Community({name}) {
  const [communities, setCommunities] = useState([]);
  const [communityThreads, setCommunityThreads] = useState([]);
  const {threads} = useLoaderData();

  useEffect(() => {
    setCommunityThreads(threads);
  }, []);

  function formatDate(dateString) {
    let inputDate = Date.parse(dateString);
    const date = new Date(inputDate);

    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  }

  return (
    <Box className="mx-auto bg-charcoal">
      <Box width="100%" className="text-center text-black text-3xl mx-auto ">
        community name here
      </Box>
      <div className="flex w-full max-w-6xl mx-auto justify-between my-0 py-0">
        <div className="flex flex-col py-0 my-0">
          {threads.map(thread => (
 
              <ThreadCard key={thread.id} thread={thread} />
 
          ))}
        </div>
        <div className="border-2 h-72 w-1/3 ml-8 mt-4">
          <div
            className="h-12 w-full pl-8 pt-2"
            style={{backgroundColor: "#CCCCCC"}}>
            Community Details
          </div>
          <div className="pl-8 pt-2">
            Join the discussion. Get involved! The latest games, the latest
            news...
          </div>
        </div>
      </div>
    </Box>
  );
}
