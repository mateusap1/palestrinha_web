import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

import { sampleEvents1, sampleEvents2 } from "../misc/samples";

type UserContext = {
  getHomeEvents: (page: number, count: number) => Promise<PalestrinhaEvent[]>;
  getHomeEventsRecommededUser: (
    userEmail: string,
    page: number,
    count: number
  ) => Promise<PalestrinhaEvent[]>;
};

type UserProviderProps = {
  children: JSX.Element;
};

export const User = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const waitForDelay = (delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };

  const getHomeEvents = async (page: number, count: number) => {
    await waitForDelay(500);

    if ((page - 1) * count >= sampleEvents1.length) {
      throw new Error("Unbounded page");
    }

    return sampleEvents1.slice((page - 1) * count, count);
  };

  const getHomeEventsRecommededUser = async (
    userEmail: string,
    page: number,
    count: number
  ) => {
    await waitForDelay(500);

    if ((page - 1) * count >= sampleEvents1.length) {
      throw new Error("Unbounded page");
    }

    return sampleEvents2.slice((page - 1) * count, count);
  };

  return (
    <User.Provider value={{ getHomeEvents, getHomeEventsRecommededUser }}>
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext(User);
