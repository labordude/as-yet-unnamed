import React, {useState, useEffect} from "react";
import {getCommunities} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
import {Link, useLoaderData, useParams} from "react-router-dom";

export async function loader({params}) {
  const communityUsers = await getCommunityUsers(params.id);
  return {communityUsers};
}
export default function Community({community}) {
  const [communities, setCommunities] = useState([]);
  const {communityUsers} = useLoaderData();

  useEffect(() => {
    getCommunities().then(data => setCommunities(data));
  }, []);

  function communityChoice() {
    if (community === "all") {
      return communities.map(community => (
        <Link to={`/communities/${community.name}`} key={community.id}>
          <CommunityCard key={community.id} community={community} />
        </Link>
      ));
    } else if (community === "Playstation") {
      return <h1>Playstation Threads</h1>;
    } else if (community === "Nintendo") {
      return <h1>Nintendo Threads</h1>;
    } else if (community === "XBox") {
      return <h1>Xbox Threads</h1>;
    } else if (community === "PC") {
      return <h1>PC Threads</h1>;
    } else if (community === "Mobile") {
      return <h1>Mobile Threads</h1>;
    }
  }

  return <div id="community_page">{communityChoice()}</div>;
}
