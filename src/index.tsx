import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
// import { Providers } from "./contexts";
import { BackEndProvider } from "./contexts/BackEndProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BackEndProvider>
        <App />
      </BackEndProvider>
    </BrowserRouter>
  </React.StrictMode>
);
