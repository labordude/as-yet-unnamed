import React, {useState, useEffect} from "react";
import {getCommunities} from "../features/ui/helpers";
export default function Social() {
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    getCommunities().then(data => setCommunities(data));
  }, []);
  return <div>Social</div>;
}
