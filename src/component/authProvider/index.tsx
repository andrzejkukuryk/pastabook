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
// import { User as UserOld, users } from "../../data/dummyUsersData";

const initialAuthContext = {
  token: null,
  user: null,
  isLoading: false,
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  editUser: () => {},
} as unknown as ValueProp; // nie ma dostępu do właściwych funcji, ale wartosci zostaną nadpisane przy pierwszym renderze

export const AuthContext = createContext<ValueProp>(initialAuthContext);

interface ValueProp {
  token: null | string;
  user: null | User;
  isLoading: boolean;
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  editUser: (newUserName: string) => Promise<void>
}

interface AuthProviderProps {
  children?: ReactNode;
}

interface User {
  email: string;
  name?: string;
} 
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const initialToken = localStorage.getItem("pastabookToken");
  const initialRefreshToken = localStorage.getItem("refreshToken");

  const [token, setToken] = useState<string | null>(initialToken);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    initialRefreshToken
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // console.log("refreshToken state: ", refreshToken);
  // console.log("token state: ", token);

  const tryRefreshLogin = () => {
    if (refreshToken) {
      refreshIdToken(refreshToken);
    }
    if (token) {
      getUserData(token);
    }
  };
  useEffect(() => tryRefreshLogin(), []);

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
    const registeredUser: User = {
      email: jsonResponse.email,
    }
    setUser(registeredUser);
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
    const loggedinUser: User = {
      email: jsonResponse.email,
      name: jsonResponse.displayName,
    }
    setUser(loggedinUser);
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
    setIsLoading(true);
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
    // console.log("refresh", jsonResponse);
    setToken(jsonResponse.id_token);
    putDataIntoLocalStorage(jsonResponse.id_token, jsonResponse.refresh_token);
    setIsLoading(false);
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
    const refreshedUser: User = {
      email: jsonResponse.users[0].email,
      name: jsonResponse.users[0].displayName,
    }
    // setUser(jsonResponse.users[0].email);
    setUser(refreshedUser);
    setIsLoading(false);
  };

  const editUser = async (newUserName: string) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      idToken: token,
      displayName: newUserName,
      photoUrl: "",
      returnSecureToken: true,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
    const jsonResponse = response.json();
    console.log("edit user response: ", jsonResponse);
    if(typeof token === "string"){
    getUserData(token)};
    // const editedUser: User = {
    //   //@ts-ignore
    //   email: jsonResponse.email,
    //   //@ts-ignore
    //   name: jsonResponse.displayName,
    // }
    // setUser(editedUser);
  }

  const value: ValueProp = {
    token,
    user,
    isLoading: isLoading,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    editUser: editUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
