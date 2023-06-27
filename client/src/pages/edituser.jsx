import React, {useEffect, useState} from "react";

import Header from "../components/Header";
import {getUserByID} from "../features/ui/helpers";
import {useLoaderData} from "react-router-dom";

export async function loader({params}) {
  const newUser = await getUserByID(params.userId);
  return newUser;
}
// navigated in here from signup form
// lead to profile when done editing
export default function EditUser(id) {
  const [userData, setUserData] = useState();
  const {newUser} = useLoaderData();
  useEffect(() => {
    setUserData(newUser);
  }, []);

  function handlePatch(event) {
    event.preventDefault();
    fetch("api/users/${id}", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(getData),
    })
      .then(r => r.json())
      .then(data => setUserData(data));
  }

  // Seperate by rows and columns (can use tailwind UI, bootstrap styling does really well for structure)
  return <Header />;

  // pass
}
