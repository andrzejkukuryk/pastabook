import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../authProvider";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const lsToken: string | null = localStorage.getItem("pastabookToken");

  const { token } = useAuthContext();
  const location = useLocation();
  if (!token && !lsToken) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
