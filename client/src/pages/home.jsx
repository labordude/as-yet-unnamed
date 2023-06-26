import React, {useEffect, useState} from "react";

import Login from "./login";
import Feed from "../components/Feed";
import NewestReviews from "../components/newest-reviews";
import {useOutletContext} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
function Home() {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useOutletContext();
  return (
    <div className="px-4">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem w="100%">
              Newest Reviews
              <NewestReviews />
            </GridItem>
            <GridItem w="100%">
              Newest Reviews
              <NewestReviews />
            </GridItem>
          </Grid>
        </>
      )}

      {/* <Games /> */}
    </div>
  );
}

export default Home;
