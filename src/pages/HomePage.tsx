import React from "react";

import { Event } from "../components/Event";

const HomePage = () => {
  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128 border-b border-b-[#BDBDBD]">
          <Event
            publicId=""
            startDate="25 Jun, 15h"
            endDate="27 Jun, 18h"
            name="Nome do Evento"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ..."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
