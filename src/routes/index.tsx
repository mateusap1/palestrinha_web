import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/ProfilePage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import CreateEventPage from "../pages/CreateEventPage";

import Protected from "../components/Protected";
import SignedProtected from "../components/SignedProtected";

import { useUser } from "../contexts/UserProvider";
import { useEffect } from "react";
import EventPage from "../pages/EventPage";

export const RoutesMain = () => {
  const { isUserSignedIn, isLoaded } = useUser()!;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected isLoggedIn={isUserSignedIn}>
            <HomePage />
          </Protected>
        }
      />
      <Route
        path="/search"
        element={
          <Protected isLoggedIn={isUserSignedIn}>
            <SearchPage />
          </Protected>
        }
      />
      <Route
        path="/create-event"
        element={
          <Protected isLoggedIn={isUserSignedIn}>
            <CreateEventPage />
          </Protected>
        }
      />
      <Route
        path="/event/:event_id"
        element={
          <Protected isLoggedIn={isUserSignedIn}>
            <EventPage />
          </Protected>
        }
      />
      <Route path="/login" element={<SignedProtected isLoggedIn={isUserSignedIn}><LoginPage /></SignedProtected>} />
      <Route path="/register" element={<SignedProtected isLoggedIn={isUserSignedIn}><RegisterPage /></SignedProtected>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
