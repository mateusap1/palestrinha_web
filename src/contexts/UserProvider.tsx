import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";

import { sampleEvents1, sampleEvents2 } from "../misc/samples";
import { useBackEnd } from "./BackEndProvider";

type UserContext = {
  isUserSignedIn: boolean;
  user: User | null;
  isLoaded: boolean;
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
  logOut: () => void;
};

type UserProviderProps = {
  children: JSX.Element;
};

export const User = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const backEnd = useBackEnd()!;

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    const user = localStorage.getItem("@user");

    if (user !== null) {
      updateUser(JSON.parse(user) as User);
    }

    setIsLoaded(true);
  };

  const updateUser = (user: User) => {
    localStorage.setItem("@user", JSON.stringify(user));

    setUser(user);
  };

  const logOut = () => {
    localStorage.removeItem("@user");
    setUser(null);
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
      value={{
        isLoaded,
        user,
        isUserSignedIn: user !== null,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext(User);
