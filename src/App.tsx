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
         <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BackEndProvider axios={baseAxios}>
        <UserProvider>
          <RoutesMain />
        </UserProvider>
      </BackEndProvider>
    </div>
  );
};

export default App;
