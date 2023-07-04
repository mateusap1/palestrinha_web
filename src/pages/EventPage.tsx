import React from "react";

import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const EventPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full h-full">
        <div className="w-128 max-md:w-80">
          <div>
            <div className="mt-8 mx-8">
              <NavBar selected={"Home"} />
            </div>
            <div className="container mx-auto py-8">
              <div>
                <h1 className="text-4xl font-bold">Página em construção</h1>
                <p className="text-lg mt-4">
                  A página que você acessou está em construção
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="text-black bg-white px-6 py-1 mt-8 rounded-full font-semibold max-md:w-60"
                >
                  Voltar para Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
