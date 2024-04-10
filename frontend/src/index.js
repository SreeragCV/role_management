import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RolesProvider } from "./store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RolesProvider>
      <App />
    </RolesProvider>
  </React.StrictMode>
);
