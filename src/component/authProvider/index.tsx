import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, users } from "../../data/dummyUsersData";

const initialAuthContext = {
  token: null,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
} as unknown as ValueProp; // nie ma dostępu do właściwych funcji, ale wartosci zostaną nadpisane przy pierwszym renderze

export const AuthContext = createContext<ValueProp>(initialAuthContext);

interface ValueProp {
  token: null | string;
  user: null | User;
  handleLogin: (user: User) => Promise<void>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children?: ReactNode;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    if (localStorage.getItem("pastabookToken")) {
      setToken(localStorage.getItem("pastabookToken"));
      const lsUser = users.find(
        (user) => user.id.toString() === localStorage.getItem("userId")
      );
      if (lsUser) {
        setUser(lsUser);
      }
    }
  };

  useEffect(() => checkLocalStorage, []);

  const fakeAuth = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("h3uu97975nvpwev7oqm63"), 250);
    });

  const handleLogin = async (user: User) => {
    const token: string = await fakeAuth();
    setToken(token);
    setUser(user);
    localStorage.setItem("pastabookToken", token);
    localStorage.setItem("userId", user.id.toString());

    const origin = location.state?.from?.pathname || "/"; // co oznaczają znaki zapytania?
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("pastabookToken");
    localStorage.removeItem("userId");
  };

  const value: ValueProp = {
    token,
    user,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
