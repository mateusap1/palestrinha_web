import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

import { sampleEvents1, sampleEvents2 } from "../misc/samples";
import { AxiosInstance } from "axios";

type BackEndContext = {
  getDepartments: () => Promise<string[]>;
  getSubAreas: () => Promise<SubArea[]>;
  getHomeEvents: (page: number, count: number) => Promise<PalestrinhaEvent[]>;
  getHomeEventsRecommededUser: (
    user: User,
    page: number,
    count: number
  ) => Promise<PalestrinhaEvent[]>;
  getFilteredEvents: (
    page: number,
    count: number,
    nome: string | null,
    eventType: EventType | null,
    startDate: Date | null,
    endDate: Date | null,
    department: string | null,
    relatedSubAreas: string[] | null
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

  const getHomeEvents = async (
    page: number,
    count: number
  ): Promise<PalestrinhaEvent[]> => {
    const response = await axios.get(`/event?page=${page}&count=${count}`);

    return response.data.map((evento: any) => ({
      publicId: evento.publicId,
      name: evento.nome,
      description: evento.descricao,
      eventType: evento.tipoEvento,
      urlMoreInfo: evento.urlMaisInfo,
      urlSubscribe: evento.urlInscricao,
      creatorName: evento.criador.nome,
      majorEvent: evento.eventoMaior,
      relatedSubAreas: evento.subAreasRelacionadas.map(
        ({ nome }: { nome: string }) => nome
      ),
      startDate: evento.dataInicio,
      endDate: evento.dataFim,
    }));
  };

  const getHomeEventsRecommededUser = async (
    user: User,
    page: number,
    count: number
  ) => {
    const response = await axios.get(
      `/user/events/${user.email}?page=${page}&count=${count}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    return response.data.map((evento: any) => ({
      publicId: evento.publicId,
      name: evento.nome,
      description: evento.descricao,
      eventType: evento.tipoEvento,
      urlMoreInfo: evento.urlMaisInfo,
      urlSubscribe: evento.urlInscricao,
      creatorName: evento.criador.nome,
      majorEvent: evento.eventoMaior,
      relatedSubAreas: evento.subAreasRelacionadas.map(
        ({ nome }: { nome: string }) => nome
      ),
      startDate: evento.dataInicio,
      endDate: evento.dataFim,
    }));
  };

  const getFilteredEvents = async (
    page: number,
    count: number,
    name: string | null,
    userType: EventType | null,
    startDate: Date | null,
    endDate: Date | null,
    department: string | null,
    relatedSubAreas: string[] | null
  ): Promise<PalestrinhaEvent[]> => {
    let filterString = `page=${page}&count=${count}`;
    if (name) {
      filterString += `&nome=${name}`;
    }
    if (userType) {
      filterString += `&tipo=${userType}`;
    }
    if (startDate) {
      filterString += `&dataInicio=${startDate}`;
    }
    if (endDate) {
      filterString += `&dataFim=${endDate}`;
    }
    if (department) {
      filterString += `&departamento="${department}"`;
    }
    if (relatedSubAreas) {
      for (const subArea of relatedSubAreas) {
        filterString += `&subAreasRelacionadas=${subArea}`;
      }
    }

    const response = await axios.get(`/event/filtered?${filterString}`);

    return response.data.map((evento: any) => ({
      publicId: evento.publicId,
      name: evento.nome,
      description: evento.descricao,
      eventType: evento.tipoEvento,
      urlMoreInfo: evento.urlMaisInfo,
      urlSubscribe: evento.urlInscricao,
      creatorName: evento.criador.nome,
      majorEvent: evento.eventoMaior,
      relatedSubAreas: evento.subAreasRelacionadas.map(
        ({ nome }: { nome: string }) => nome
      ),
      startDate: evento.dataInicio,
      endDate: evento.dataFim,
    }));
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
        getFilteredEvents,
      }}
    >
      {children}
    </BackEnd.Provider>
  );
};

export const useBackEnd = () => useContext(BackEnd);
