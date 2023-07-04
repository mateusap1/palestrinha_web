import React, { useContext, useEffect, useState } from "react";
import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

type Selection = "Recentes" | "Sugeridos";

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMM, HH:mm");

  return formattedDate;
};

const LoadingPage = () => {
  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full h-full">
        <div className="w-128 max-md:w-80">
          <div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-20 h-20">
                <LoadingIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
