import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

import { sampleEvents1, sampleEvents2 } from "../misc/samples";
import { useBackEnd } from "./BackEndProvider";

type UserContext = {
  isUserSignedIn: boolean;
  user: User | null;
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

type UserProviderProps = {
  children: JSX.Element;
};

export const User = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const backEnd = useBackEnd()!;

  const updateUser = (user: User) => {
    setUser(user);
  };

  const signIn = async (email: string, password: string) => {
    const response = await backEnd.signIn(email, password);

    if (response.success) {
      const successResponse = response as SignInResponseSuccess;

      updateUser({
        name: successResponse.name,
        email: successResponse.email,
        registration: successResponse.registration,
        userType: successResponse.userType,
        token: successResponse.token,
      });
    }

    return response;
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
    const response = await backEnd.signUp(
      name,
      email,
      password,
      registration,
      department,
      userType,
      interestedSubAreas
    );

    return response;
  };

  return (
    <User.Provider
      value={{ user, isUserSignedIn: user !== null, signIn, signUp }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext(User);
