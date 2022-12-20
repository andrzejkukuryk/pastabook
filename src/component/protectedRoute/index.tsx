import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../authProvider";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthContext();
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
