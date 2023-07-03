import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Protected from "../components/Protected";
import { useUser } from "../contexts/UserProvider";

export const RoutesMain = () => {
  const { isUserSignedIn } = useUser()!;

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
