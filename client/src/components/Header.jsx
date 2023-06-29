import React, {useState, useEffect} from "react";
import {Link, redirect} from "react-router-dom";
import {getCommunities} from "../features/ui/helpers";
// need to add header photo to autoload
export default function Header({onLogout, user}) {
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
  return (
    <div
      className="navbar"
      style={{backgroundColor: "#1e2d24", borderBottom: ""}}>
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden hover:bg-smokey">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white">
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
            <b>
            <li>
              <Link to="/games" style={{color:"#1E2D24"}}>Games</Link>
            </li>
            </b>
            <b>
            <li>
              <Link to="/communities" style={{color:"#1E2D24"}}>Communities</Link>
            </li>
            </b>
            <b>
            <li>
              <Link to="/social" style={{color:"#1E2D24"}}>Social</Link>
            </li>
            </b>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-3xl text-white hover:bg-smokey">
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
                <Link to="/communities" className="text-xl text-white">
                  Communities
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-xl text-white">
                  Social
                </Link>
              </li>
            </>
          ) : null}
          {!user ? (
            <>
              <li>
                <Link to="/" className="text-xl text-white">
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
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}

          <div className="dropdown dropdown-end mx-4 ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-16 rounded-full transform transition-transform hover:scale-110">
                <img src={"https://placekitten.com/100/100"} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
              <b>
                <li>
                  <Link
                    to={`/profile`}
                    className="justify-between"
                    style={{color: "#1E2D24"}}>
                    Profile
                  </Link>
                  {/* <span className="badge">New</span> */}
                </li>
              </b>
              <b>
                <li>
                  <a style={{color: "#1E2D24"}}>Settings</a>
                </li>
              </b>
              <b>
                <li onClick={handleLogoutClick} style={{color: "#1E2D24"}}>
                  <a>Logout</a>
                </li>
              </b>
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
