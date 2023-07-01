import React, { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          {isLoading ? (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-20 h-20">
                <LoadingIcon />
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-8 mx-8">
                <NavBar selected={"Search"} />
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
