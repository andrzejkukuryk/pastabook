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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  userFB: null,
  auth: null,
  handleRegisterFB: () => {},
  handleLoginFB: () => {},
  handleLogoutFB: () => {},
} as unknown as ValueProp; // nie ma dostępu do właściwych funcji, ale wartosci zostaną nadpisane przy pierwszym renderze

export const AuthContext = createContext<ValueProp>(initialAuthContext);

interface ValueProp {
  token: null | string;
  user: null | UserOld;
  userFB: UserCredential | User | null;
  auth: Auth;
  handleRegisterFB: (email: string, password: string) => Promise<void>;
  handleLoginFB: (email: string, password: string) => Promise<void>;
  handleLogoutFB: () => Promise<void>;
}

interface AuthProviderProps {
  children?: ReactNode;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserOld | null>(null);
  const [userFB, setUserFB] = useState<UserCredential | User | null>(null);

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUserFB(currentUser);
  // });

  const location = useLocation();
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    if (localStorage.getItem("pastabookToken")) {
      setToken(localStorage.getItem("pastabookToken"));
      // const lsUser = users.find(
      //   (user) => user.id.toString() === localStorage.getItem("userId")
      // );
      // if (lsUser) {
      //   setUser(lsUser);
      // }
    }
  };

  useEffect(() => checkLocalStorage, []);

  // chyba niepotrzebne, ale jak jest poza useEffect to robi nieskońmczoną pętle
  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        console.log("authstateChange");
        setUserFB(currentUser);
      }),
    []
  );
  ///////////////////////////

  const fakeAuth = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("h3uu97975nvpwev7oqm63"), 250);
    });

  const getToken = async () => {
    auth.currentUser?.getIdToken().then((currentToken) => {
      setToken(currentToken);
      localStorage.setItem("pastabookToken", currentToken);
    });
  };

  const handleRegisterFB = async (email: string, password: string) => {
    try {
      const userFB = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserFB(userFB);
      await getToken();
      //@ts-ignore
      // setToken(userFB?.user?.accessToken);
      if (token) {
        localStorage.setItem("pastabookToken", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginFB = async (email: string, password: string) => {
    try {
      const userFB = await signInWithEmailAndPassword(auth, email, password);
      setUserFB(userFB);
      await getToken();
      //@ts-ignore
      // setToken(userFB.user.accessToken);

      if (token) {
        console.log("próba ustalenia localstorage");
        localStorage.setItem("pastabookToken", token);
      }
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutFB = async () => {
    console.log("logout");
    await signOut(auth);
    setUserFB(null);
    setToken(null);
    localStorage.removeItem("pastabookToken");
  };

  console.log("userFB: ", userFB);
  console.log("token: ", token);
  //@ts-ignore
  console.log(auth?.currentUser?.email);

  const value: ValueProp = {
    token,
    user,
    userFB,
    auth,
    handleRegisterFB: handleRegisterFB,
    handleLoginFB: handleLoginFB,
    handleLogoutFB: handleLogoutFB,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
