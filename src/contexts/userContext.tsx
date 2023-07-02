import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { IUser, ILogin, IUsuarioRegister } from "../interfaces";
import api from "../services/server";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (data: ILogin) => Promise<void>;
  createUser: (
    data: IUsuarioRegister
  ) => Promise<{ token: string; userId: number }>;
  getUserEvents: (email: string, page: number, count: number) => any;
}

export const UserContext = createContext({} as UserContextType);

export const DataUserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      if (userId) {
        getUser(parseInt(userId));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  const login = async (data: ILogin) => {
    try {
      const response = await api.post("/login", data);
      const { token } = response.data;
      const decodedToken: any = jwt_decode(token); // Decodifica o token de acesso
      const userId = decodedToken?.id;
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      getUser(userId);
      navigate("/");
    } catch (error) {
      console.log("erro:", error);
    }
  };

  const getUser = async (userId: number) => {
    try {
      const { data } = await api.get(`/user/${userId}`);
      setUser(data);
    } catch (error) {
      console.log("erro:", error);
    }
  };

  const createUser = async (data: IUsuarioRegister) => {
    try {
      const response = await api.post("/user", data);
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/");
      return { token, userId };
    } catch (error) {
      console.log("erro:", error);
      throw new Error("Erro ao criar usuário");
    }
  };

  const getUserEvents = async (email: string, page: number, count: number) => {
    await waitForDelay(500);
    try {
      const response = await api.get(
        `/user-events?email=${email}&page=${page}&count=${count}`
      );
      const eventos = response.data;
      if ((page - 1) * count >= eventos.length) {
        throw new Error("Unbounded page");
      }

      return eventos.slice((page - 1) * count, count);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        createUser,
        getUserEvents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
function waitForDelay(arg0: number) {
  throw new Error("Function not implemented.");
}
