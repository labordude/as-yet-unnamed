// React
import React from "react";
// React DOM
import ReactDOM from "react-dom/client";
// React
import App from "./App.jsx";
// chakra UI
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
// tailwind
import "./index.css";
// React Router
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// vite
import "vite/modulepreload-polyfill";
// clean up and bakc fill anything that is old code
// componenets and endpoints
import Home from "./pages/home";
import SignUpForm, {
  action as SignUpAction,
} from "./components/Auth/SignUpForm.jsx";
import Login from "./pages/login";
import Feed from "./components/Feed.jsx";
import Communities from "./pages/communities.jsx";
import Games from "./pages/games.jsx";
import Game, {loader as gameLoader} from "./pages/game.jsx";
import Social from "./pages/social.jsx";
import CommunityCard from "./components/community-card.jsx";
import Profile, {loader as profileLoader} from "./pages/profile.jsx";
import User, {loader as useridLoader} from "./pages/user.jsx";
import EditUser from "./pages/edituser.jsx";
import NewReviewForm from "./components/NewReviewForm.jsx";
// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
        errorElement: <div>Whoops!</div>,
        action: SignUpAction,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/games/:id",
        element: <Game />,
        loader: gameLoader,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/games",
        element: <Games />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/social",
        element: <Social />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/communities/:community",
        element: <Communities />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/users/:id",
        element: <User />,
        loader: useridLoader,
        errorElement: <div>Whoops!</div>,
      },

      {
        path: "/edituser/:userid",
        element: <EditUser />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/new_review_form",
        element: <NewReviewForm />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/*",
        element: <Home />,
        errorElement: <div>Whoops!</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
