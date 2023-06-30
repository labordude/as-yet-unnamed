import React, {useState, useEffect} from "react";
import {
  getCommunities,
  getCommunityThreads,
  likeThread,
  unlikeThread,
  getCommunityName,
} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {Container, Box, Icon, VStack, StackDivider} from "@chakra-ui/react";
import {BiSolidDownArrowSquare, BiSolidUpArrowSquare} from "react-icons/bi";
import ThreadCard from "../features/communities/thread-card";
export async function loader({params}) {
  const threads = await getCommunityThreads(params.id);
  const communityName = await getCommunityName(params.id);
  return {threads, communityName};
}
export default function Community({name}) {
  const [communities, setCommunities] = useState([]);
  const [communityThreads, setCommunityThreads] = useState([]);
  const {threads, communityName} = useLoaderData();
  const [user, setUser] = useOutletContext();
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
  console.log(user);
  return (
    <Box className="mx-auto bg-charcoal">
      <Box width="90%" className="text-left text-black text-3xl mx-auto ">
        /X/{communityName.message}
      </Box>
      <div className="flex w-full max-w-6xl mx-auto justify-between my-0 py-0">
        <div className="flex flex-col py-0 my-0">
          {threads.map(thread => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
        <div className="border-2 h-72 w-1/3 ml-8 mt-4">
          <div
            className="h-12 w-full pl-8 pt-2 text-lightgray"
            style={{backgroundColor: "#666666"}}>
            {communityName.message} community details
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
