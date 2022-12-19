import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext<ValueProp | null>(null);

interface ValueProp {
  token: null;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
}
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// TODO: children type

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fakeAuth = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("h3uu97975nvpwev7oqm63"), 250);
    });

  const handleLogin = async () => {
    //TODO: znowu type!!!!!
    const token: any = await fakeAuth();
    setToken(token);

    const origin = location.state?.from?.pathname || "/"; // co oznaczają znaki zapytania?
    console.log("location.state: ", location.state);
    console.log("origin: ", origin);
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value: ValueProp = {
    token,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
