import React from "react";
import bcrypt from "bcrypt";
function Success({newUser}) {
  const {name, username, password, email, bio, pfp_image} = newUser;
  const hashBrowns = bcrypt.hash(password, 10);
  return (
    <div>
      Successfully created:
      <ul>
        New User
        <li>Name: {name}</li>
        <li>Username: {username}</li>
        <li>Password hash: {hashBrowns}</li>
        <li>Email: {email}</li>
        <li>{bio}</li>
        <li>{pfp_image}</li>
      </ul>
    </div>
  );
}
