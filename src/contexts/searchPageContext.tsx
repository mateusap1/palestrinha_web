// search.tsx
import React, { createContext, useEffect, useState } from "react";
import api from "../services/server";

export interface Event {
  id: number;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  department: string;
  subAreas: string[];
  creator: string;
}

interface SearchPageContextProps {
  events: Event[];
  filteredEvents: Event[];
  filterByType: (type: string) => void;
  filterByDate: (startDate: Date, endDate: Date) => void;
  filterByDepartment: (department: string) => void;
  filterBySubAreas: (subAreas: string[]) => void;
  resetFilters: () => void;
}

export const SearchPageContext = createContext<SearchPageContextProps>({
  events: [],
  filteredEvents: [],
  filterByType: () => {},
  filterByDate: () => {},
  filterByDepartment: () => {},
  filterBySubAreas: () => {},
  resetFilters: () => {},
});

const SearchPageProvider = ({ children }: any) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await api.get("/event");
      const eventsData = response.data;
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByType = (type: string) => {
    const filtered = events.filter((event) => event.type === type);
    setFilteredEvents(filtered);
  };

  const filterByDate = (startDate: Date, endDate: Date) => {
    const filtered = events.filter(
      (event) => event.startDate >= startDate && event.endDate <= endDate
    );
    setFilteredEvents(filtered);
  };

  const filterByDepartment = (department: string) => {
    const filtered = events.filter((event) => event.department === department);
    setFilteredEvents(filtered);
  };

  const filterBySubAreas = (subAreas: string[]) => {
    const filtered = events.filter((event) =>
      event.subAreas.some((subArea) => subAreas.includes(subArea))
    );
    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setFilteredEvents(events);
  };

  return (
    <SearchPageContext.Provider
      value={{
        events,
        filteredEvents,
        filterByType,
        filterByDate,
        filterByDepartment,
        filterBySubAreas,
        resetFilters,
      }}
    >
      {children}
    </SearchPageContext.Provider>
  );
};

export default SearchPageProvider;
