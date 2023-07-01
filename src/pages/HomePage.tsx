import React, { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

import { format } from "date-fns";

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

  const [isLoading, setIsLoading] = useState(true);

  const { getHomeEvents } = useBackEnd()!;

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    await loadHomeEvents();

    setIsLoading(false);
  };

  const loadHomeEvents = async () => {
    const events = await getHomeEvents(currentPage, 10);

    setCurrentEvents(events);
  };

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
                <div className="flex flex-row justify-between items-center mx-32 mt-4 font-bold">
                  <span className="border-b-2 p-2 hover:cursor-pointer">
                    Recentes
                  </span>
                  <span className="hover:cursor-pointer">Sugerido</span>
                </div>
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
