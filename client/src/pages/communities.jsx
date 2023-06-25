import React, {useState, useEffect} from "react";
import {getCommunities} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
export default function Communities() {
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    getCommunities().then(data => setCommunities(data));
  }, []);
  return (
    <div id="community_page">
      {communities.map(community => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
}
