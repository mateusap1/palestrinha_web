import React, { useContext, useEffect, useState } from "react";
import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

import { format } from "date-fns";

type Selection = "Recentes" | "Sugeridos";

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMM, HH:mm");

  return formattedDate;
};

const HomePage = () => {
  const [currentEvents, setCurrentEvents] = useState<PalestrinhaEvent[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Selection>("Recentes");

  const [isLoading, setIsLoading] = useState(true);

  const { getHomeEvents, getHomeEventsRecommededUser } = useBackEnd()!;

  useEffect(() => {
    loadHomeEvents();
  }, []);

  const loadHomeEvents = async () => {
    const events = await getHomeEvents(currentPage, 10);

    setCurrentEvents(events);
    setIsLoading(false);
  };

  const loadHomeEventsRecommededUser = async () => {
    const events = await getHomeEventsRecommededUser("", currentPage, 10);

    setCurrentEvents(events);
    setIsLoading(false);
  };

  const selectSugeridos = () => {
    setIsLoading(true);
    setSelected("Sugeridos");
    loadHomeEventsRecommededUser();
  };

  const selectRecentes = () => {
    setIsLoading(true);
    setSelected("Recentes");
    loadHomeEvents();
  };

  const Selector = () => (
    <div className="flex flex-row justify-between items-center mx-32 mt-4 font-bold">
      <span
        className={`${
          selected === "Recentes" ? "border-b-2 p-2" : ""
        } hover:cursor-pointer`}
        onClick={selectRecentes}
      >
        Recentes
      </span>
      <span
        className={`${
          selected === "Sugeridos" ? "border-b-2 p-2" : ""
        } hover:cursor-pointer`}
        onClick={selectSugeridos}
      >
        Sugeridos
      </span>
    </div>
  );

  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div>
            <div className="mt-8 mx-8">
              <NavBar selected={"Home"} />
            </div>
            {isLoading ? (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-20 h-20">
                  <LoadingIcon />
                </div>
              </div>
            ) : (
              <div>
                <Selector />
                <div>
                  {currentEvents!.map(
                    ({ publicId, startDate, endDate, name, description }) => (
                      <Event
                        publicId={publicId}
                        startDate={formatDateString(startDate)}
                        endDate={formatDateString(endDate)}
                        name={name}
                        description={description}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
