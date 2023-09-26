import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { RoutesMain } from "./routes";

import { UserProvider } from "./contexts/UserProvider";
import { BackEndProvider } from "./contexts/BackEndProvider";

import axios from "axios";

const baseAxios = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

const App: React.FC = () => {
  return (
    <div>
      <BackEndProvider axios={baseAxios}>
        <UserProvider>
          <>
            <RoutesMain />
            <ToastContainer />
          </>
        </UserProvider>
      </BackEndProvider>
    </div>
  );
};

export default App;
