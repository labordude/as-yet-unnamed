import React, {useState, useEffect} from "react";
import {getCommunities} from "../features/ui/helpers";
import CommunityCard from "../components/community-card";
import {Link, useParams} from "react-router-dom";

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const {community} = useParams();

  useEffect(() => {
    getCommunities().then(data => setCommunities(data));
  }, []);

  function communityChoice() {
    if (community === "all") {
      return communities.map(community => (
        <Link to={`/communities/${community.id}`} key={community.id}>
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

  return (
    <div style={{backgroundColor:"#334139"}}>
    <div id="community_page" style={{paddingTop:"50px", paddingBottom:"35.6vh"}}>
      {communities.map(community => (
        <Link 
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            marginBottom: "20px",
          }}
          to={`/communities/${community.id}`} 
          key={community.id}>
          <CommunityCard key={community.id} community={community} />
        </Link>
      ))}
    </div>
    </div>
  );
}
