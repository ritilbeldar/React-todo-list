import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router-dom";
import Context from "./utils/Context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
    </BrowserRouter>
  </Context>
);
