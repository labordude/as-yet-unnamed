import React, {useEffect, useState} from "react";

import Login from "./login";
import Feed from "../components/Feed";
import NewestReviews from "../components/newest-reviews";
import NewestGames from "../components/newest-games";
import {useOutletContext} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
function Home() {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useOutletContext();
  // conditional to check if user exisits then runs login code
  //       {!user ? (
  // <Login onLogin={setUser} />
  // ) : (

  return (
    <div className="px-4 bg-smokey">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem w="100%" style={{marginTop:"20px"}}>
          <div style={{marginBottom:"10px", fontSize:"25px"}}>
          <b>Newest Reviews</b>
          </div>
          <NewestReviews />
        </GridItem>
        <GridItem w="100%" style={{marginTop:"20px"}}>
          <div style={{marginBottom:"10px", fontSize:"25px"}}>
          <b>Newest Games</b>
          </div>
          <NewestGames />
        </GridItem>
      </Grid>

      {/* <Games /> */}
    </div>
  );
}

export default Home;
// honcho start -f Procfile.dev to start
