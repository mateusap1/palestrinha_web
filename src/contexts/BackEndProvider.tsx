import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

type BackEndContext = {};

type BackEndProviderProps = {
  children: JSX.Element;
};

export const BackEnd = createContext<BackEndContext | null>(null);

export const BackEndProvider = ({ children }: BackEndProviderProps) => {
  const waitForDelay = (delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };

  return <BackEnd.Provider value={{}}>{children}</BackEnd.Provider>;
};

export const useBackEnd = () => useContext(BackEnd);
