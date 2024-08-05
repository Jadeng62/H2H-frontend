import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Modal from "react-modal";
import "./index.css";

// Set the app element to prevent warning in dev tools (needed for accessibility tools such as screen readers)
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
