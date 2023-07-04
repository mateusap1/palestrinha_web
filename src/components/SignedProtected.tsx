import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type SignedProtectedProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

const SignedProtected = ({ isLoggedIn, children }: SignedProtectedProps) => {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>
};

export default SignedProtected;
