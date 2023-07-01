import React, { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";

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
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <LoadingIcon size={20} />
            </div>
          ) : (
            currentEvents!.map(
              ({ publicId, startDate, endDate, name, description }) => (
                <Event
                  publicId={publicId}
                  startDate={formatDateString(startDate)}
                  endDate={formatDateString(endDate)}
                  name={name}
                  description={description}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
