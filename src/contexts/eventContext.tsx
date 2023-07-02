import React, { createContext, useEffect, useState } from "react";
import { IEvent, IEventCreation } from "../interfaces";
import api from "../services/server";
import { useNavigate } from "react-router-dom";

interface EventContextType {
  event: IEvent | null;
  setEvent: React.Dispatch<React.SetStateAction<IEvent | null>>;
  createEvent: (data: IEventCreation) => Promise<void>;
  editEvent: (eventId: number, data: IEventCreation) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  getHomeEvents: (page: number, count: number) => Promise<any>;
}

export const EventContext = createContext({} as EventContextType);

export const EventDataProvider = ({ children }: any) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("@accessToken");
  const userId = localStorage.getItem("@userID");

  useEffect(() => {
    try {
      if (userId) {
        getEvents(parseInt(userId));
      } else {
        setEvent(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getEvents = async (userId: number) => {
    try {
      const { data } = await api.get(`/events/${userId}`);
      setEvent(data);
    } catch (error) {
      console.log("erro", error);
    }
  };

  const createEvent = async (data: IEventCreation) => {
    try {
      const response = await api.post("/event", data);
      navigate("/home");
    } catch (error) {
      console.log("Cadastro evento deu errado ==>>", error);
    }
  };

  const getHomeEvents = async (page: number, count: number) => {

    const response = await api.get("/event");
    const eventos = response.data;
    if ((page - 1) * count >= eventos.length) {
      throw new Error("Unbounded page");
    }

    return eventos.slice((page - 1) * count, count);
  };

  const editEvent = async (eventId: number, data: IEventCreation) => {
    try {
      const response = await api.put(`/event/${eventId}`, data);
      // Lógica adicional após a edição do evento
    } catch (error) {
      console.log("Edição do evento deu errado ==>>", error);
    }
  };

  const deleteEvent = async (eventId: number) => {
    try {
      const response = await api.delete(`/event/${eventId}`);
      // Lógica adicional após a exclusão do evento
    } catch (error) {
      console.log("Exclusão do evento deu errado ==>>", error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        createEvent,
        editEvent,
        deleteEvent,
        getHomeEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
function waitForDelay(arg0: number) {
  throw new Error("Function not implemented.");
}
