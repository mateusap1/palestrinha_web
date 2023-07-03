import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

const Protected = ({ isLoggedIn, children }: ProtectedProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>
};

export default Protected;
