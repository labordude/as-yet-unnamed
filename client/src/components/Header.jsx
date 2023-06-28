import React, {useState, useEffect} from "react";
import {Link, redirect} from "react-router-dom";
import {getCommunities} from "../features/ui/helpers";
import {Box, Grid, GridItem, Image, Avatar, AvatarBadge, CloseButton, Container } from '@chakra-ui/react';
// need to add header photo to autoload
export default function Header({onLogout, user}) {
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    getCommunities().then(data => setCommunities(data));
  }, []);
  function handleLogoutClick() {
    // POST fetch to dispatch
    fetch(`/api/logout`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
      .then(resp => {
        if (resp.ok) {
          onLogout(null);
        }
      })
      .catch(error => console.log("error", error.message));
  }

  // function createStackNavigator({
  //   Home: {
  //     screen: HomeScreen
  //   },
  // }, {
  //   navigationOptions: {
  //     headerBackground: () => (
  //       <Image
  //         style={StyleSheet.absoluteFill}
  //         source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}

  //       />
  //     ),
  //   }
  // };
// https://raw.githubusercontent.com/labordude/as-yet-unnamed/69785785968cc49407465cfd216c24ec92c12f6f/GameXperience%20background.jpeg


// DaisyUI

  return (
  <div className="Header_Image"> 
    <div className="navbar bg-base-300">
    {/* <img src="https://raw.githubusercontent.com/labordude/as-yet-unnamed/main/GameXperience%20background.jpeg" alt="HeaderImg"></img> */}
    {/* <img src="https://raw.githubusercontent.com/labordude/as-yet-unnamed/main/assets/eugene-chystiakov-YpMj5WQ6dNs-unsplash.jpg" alt="Header Image"></img> */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/communities/all">Communities</Link>
            </li>
            <li>
              <Link to="/social">Social</Link>
            </li>
          </ul>
        </div>
        <Link
          to="/home"
          className="btn btn-ghost normal-case text-3xl text-white">
          GameXperience
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <>
              <li>
                <Link to="/games" className="text-xl text-white">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/communities/all" className="text-xl text-white">
                  Communities
                </Link>
              </li>
              <li>
                <Link to="/social"  className="text-xl text-white">Social</Link>
              </li>
            </>
          ) : null}
          {!user ? (
            <>
              <li>
                <Link to="/home" className="text-xl text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-xl text-white">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li onClick={handleLogoutClick}>
              <a className="text-xl text-white">Logout</a>
            </li>
          )}
        </ul>
      </div>
      {user ? (
        <div className="navbar navbar-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>

          <div className="dropdown dropdown-end mx-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-16 rounded-full">
                <img src={"https://placekitten.com/100/100"} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={`/profile`} className="justify-between">
                  Profile
                </Link>
                {/* <span className="badge">New</span> */}
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogoutClick}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
    </div>
  );
}
