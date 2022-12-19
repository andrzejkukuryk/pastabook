import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../data/dummyUsersData";

export const AuthContext = createContext<ValueProp | null>(null);

interface ValueProp {
  token: null | string;
  user: null | User;
  handleLogin: (user: User) => Promise<void>;
  handleLogout: () => void;
}
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// TODO: children type

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fakeAuth = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("h3uu97975nvpwev7oqm63"), 250);
    });

  const handleLogin = async (user: User) => {
    //TODO: znowu type!!!!!
    const token: any = await fakeAuth();
    setToken(token);
    setUser(user);
    console.log(user.username);
    const origin = location.state?.from?.pathname || "/"; // co oznaczają znaki zapytania?
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value: ValueProp = {
    token,
    user,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
