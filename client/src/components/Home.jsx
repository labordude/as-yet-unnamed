import React, {useEffect, useState} from "react";

import Login from "./Auth/Login";
import Feed from "./Feed";
import {useOutletContext} from "react-router-dom";
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
          <Feed />
        </>
      )}

      {/* <Games /> */}
    </div>
  );
}

export default Home;
