import { ReactNode } from "react";
import { DataUserProvider } from "./userContext";
import { EventDataProvider } from "./eventContext";
import SearchPageProvider from "./searchPageContext";
import React from "react";

interface iProvider {
  children: ReactNode;
}

export const Providers = ({ children }: iProvider) => {
  return (
    <DataUserProvider>
      <SearchPageProvider>
        <EventDataProvider>{children}</EventDataProvider>
      </SearchPageProvider>
    </DataUserProvider>
  );
};
