import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import "vite/modulepreload-polyfill";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
