import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../authProvider";

export function ProtectedRoute({ children }: any) {
  // @ts-ignore
  const { token } = useAuthContext();
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return children;
}
