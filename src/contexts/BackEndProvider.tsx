import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

import { sampleEvents1, sampleEvents2 } from "../misc/samples";
import { AxiosInstance } from "axios";

type BackEndContext = {
  getDepartments: () => Promise<string[]>;
  getSubAreas: () => Promise<SubArea[]>;
  getHomeEvents: (page: number, count: number) => Promise<PalestrinhaEvent[]>;
  getHomeEventsRecommededUser: (
    userEmail: string,
    page: number,
    count: number
  ) => Promise<PalestrinhaEvent[]>;
  signIn: (
    email: string,
    password: string
  ) => Promise<SignInResponseSuccess | BackEndResponseFailure>;
  signUp: (
    name: string,
    email: string,
    password: string,
    registration: string,
    department: string,
    userType: string,
    interestedSubAreas: string[]
  ) => Promise<SignUpResponseSuccess | BackEndResponseFailure>;
};

type BackEndProviderProps = {
  children: JSX.Element;
  axios: AxiosInstance;
};

export const BackEnd = createContext<BackEndContext | null>(null);

export const BackEndProvider = ({ children, axios }: BackEndProviderProps) => {
  const waitForDelay = (delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };

  const getDepartments = async (): Promise<string[]> => {
    const response = await axios.get("/departamentos");

    return response.data;
  };

  const getSubAreas = async (): Promise<SubArea[]> => {
    const response = await axios.get("/subareas");

    return response.data;
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

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("/user/login", {
        email,
        senha: password,
      });

      return {
        success: true,
        name: response.data.nome,
        email: response.data.email,
        registration: response.data.matricula,
        userType: response.data.tipo,
        token: response.data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error as string,
      };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    registration: string,
    department: string,
    userType: string,
    interestedSubAreas: string[]
  ) => {
    try {
      const response = await axios.post("/user/register", {
        nome: name,
        email: email,
        senha: password,
        matricula: registration,
        departamento: department,
        tipoUsuario: userType,
        subAreasInteresse: interestedSubAreas,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as string,
      };
    }
  };

  return (
    <BackEnd.Provider
      value={{
        signIn,
        signUp,
        getHomeEvents,
        getHomeEventsRecommededUser,
        getDepartments,
        getSubAreas,
      }}
    >
      {children}
    </BackEnd.Provider>
  );
};

export const useBackEnd = () => useContext(BackEnd);
