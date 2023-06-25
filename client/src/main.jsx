// React
import React from "react";
// React DOM
import ReactDOM from "react-dom/client";
// React
import App from "./App.jsx";
// chakra UI
import {ChakraProvider} from "@chakra-ui/react";
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
// componenets and endpoints
import Home from "./pages/home";
import SignUpForm from "./components/Auth/SignUpForm.jsx";
import Login from "./pages/login";
import Feed from "./components/Feed.jsx";
// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    children: [
      {index: true, element: <Home />},
      {
        path: "/signup",
        element: <SignUpForm />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <div>Whoops!</div>,
      },
      {
        path: "/feed",
        element: <Feed />,
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
