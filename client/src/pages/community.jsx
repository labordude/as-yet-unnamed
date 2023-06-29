import React, {useState, useEffect} from "react";
import {getCommunities, getCommunityThreads} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {Container, Box} from "@chakra-ui/react";
import Thread from "../features/communities/thread";
export async function loader({params}) {
  const threads = await getCommunityThreads(params.id);
  return {threads};
}
export default function Community() {
  const [communities, setCommunities] = useState([]);
  const [communityThreads, setCommunityThreads] = useState([]);
  const {threads} = useLoaderData();

  useEffect(() => {
    setCommunityThreads(threads);
  }, []);

  return (
    <Box>
      {threads.map(thread => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </Box>
  );
}
