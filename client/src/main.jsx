import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import "./index.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "vite/modulepreload-polyfill";
import Home from "./components/Home.jsx";
import SignUpForm from "./components/Auth/SignUpForm.jsx";
import Login from "./components/Auth/Login.jsx";
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
