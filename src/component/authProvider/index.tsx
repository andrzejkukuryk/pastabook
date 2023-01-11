// TODO: funkcja do rejstracji
// funkcja do logowania
// obsługa błedów
// obsługa stanu ładowania
// state: token, dane uzytkownika

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User as UserOld, users } from "../../data/dummyUsersData";
import {
  // createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  Auth,
} from "firebase/auth";
import { auth } from "../../firebase-config";

const initialAuthContext = {
  token: null,
  user: null,
  isLoading: false,
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
} as unknown as ValueProp; // nie ma dostępu do właściwych funcji, ale wartosci zostaną nadpisane przy pierwszym renderze

export const AuthContext = createContext<ValueProp>(initialAuthContext);

interface ValueProp {
  token: null | string;
  user: null | UserOld;
  isLoading: boolean;
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children?: ReactNode;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    if (localStorage.getItem("refreshToken")) {
      const lsRefreshToken = localStorage.getItem("refreshToken");
      if (typeof lsRefreshToken === "string") {
        refreshIdToken(lsRefreshToken);
      }
    }

    if (localStorage.getItem("pastabookToken")) {
      const lsToken = localStorage.getItem("pastabookToken");
      setToken(lsToken);
      if (typeof lsToken === "string") {
        // refreshIdToken(lsToken);
        getUserData(lsToken);
      }
    }
  };

  useEffect(() => checkLocalStorage, []);

  const registerUser = async (email: string, password: string) => {
    setIsLoading(true);
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    setUser(jsonResponse.email);
    setToken(jsonResponse.idToken);
    setRefreshToken(jsonResponse.refreshToken);
    putDataIntoLocalStorage(jsonResponse.idToken, jsonResponse.refreshToken);
    setIsLoading(false);
  };

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    console.log("json response login: ", jsonResponse);
    setUser(jsonResponse.email);
    setToken(jsonResponse.idToken);
    setRefreshToken(jsonResponse.refreshToken);
    putDataIntoLocalStorage(jsonResponse.idToken, jsonResponse.refreshToken);
    setIsLoading(false);

    const origin = location.state?.from?.pathname || "/";
    navigate(origin);
  };

  const logoutUser = () => {
    setIsLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem("pastabookToken");
    localStorage.removeItem("refreshToken");
    setIsLoading(false);
  };

  const putDataIntoLocalStorage = (token: string, refreshToken: string) => {
    localStorage.setItem("pastabookToken", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const refreshIdToken = async (token: string) => {
    // setIsLoading(true);
    const endpoint = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      grant_type: "refresh_token",
      refreshToken: token,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log("refresh", jsonResponse);
    setToken(jsonResponse.id_token);
    putDataIntoLocalStorage(jsonResponse.id_token, jsonResponse.refresh_token);
  };

  const getUserData = async (token: string) => {
    setIsLoading(true);
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      idToken: token,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setUser(jsonResponse.users[0].email);
    setIsLoading(false);
  };

  const value: ValueProp = {
    token,
    user,
    isLoading: isLoading,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
