import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";

import { UserProvider } from "./contexts/UserProvider";
import { BackEndProvider } from "./contexts/BackEndProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BackEndProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </BackEndProvider>
    </BrowserRouter>
  </React.StrictMode>
);
