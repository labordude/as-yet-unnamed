import React, {useState} from "react";
import {Link} from "react-router-dom";
export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  function handleLogin() {
    // POST fetch to dispatch
    fetch(`/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    })
      .then(resp => resp.json())
      .then(newstring => {
        console.log(newstring);
        if (newstring.message[0] === "successful login") {
          setLoggedIn(prevLoggedIn => !prevLoggedIn);
        }
      })
      .catch(error => console.log("error", error.message));
  }
  function handleLogout() {
    // POST fetch to dispatch
    fetch(`/logout`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
      .then(resp => {
        if (resp.ok) {
          setLoggedIn(prevLoggedIn => !prevLoggedIn);
        }
      })
      .catch(error => console.log("error", error.message));
  }
  return (
    <div className="navbar bg-slate-600 ">
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
            <li className="text-xl">
              <a className="text-xl">Home</a>
            </li>
            <li>
              <a>Menu</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-3xl text-white">
          GameXperience
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-xl text-white">Home</a>
          </li>
          <li tabIndex={0}>
            {loggedIn ? (
              <details>
                <summary className="text-xl">Menu</summary>
                <ul className="p-2">
                  <li>
                    <a className="text-xl text-white">Submenu 1</a>
                  </li>
                  <li>
                    <a className="text-xl text-white">Submenu 2</a>
                  </li>
                </ul>
              </details>
            ) : null}
          </li>
          {!loggedIn ? (
            <li>
              <Link to="/login" className="text-xl text-white">
                Login
              </Link>
            </li>
          ) : (
            <li onClick={handleLogoutClick}>
              <a className="text-xl text-white">Logout</a>
            </li>
          )}
          <li>
            <Link to="/signup" className="text-xl text-white">
              Signup
            </Link>
          </li>
        </ul>
      </div>

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
              <img src="https://placekitten.com/100/100" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between" href="/profile">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
