import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialAuthContext = {
  token: null,
  user: null,
  isLoading: false,
  errorMessage: "",
  setErrorMessage: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  editUser: () => {},
  submitRegisterPressed: () => {},
  addToFavorites: () => {},
} as unknown as ValueProp; // nie ma dostępu do właściwych funcji, ale wartosci zostaną nadpisane przy pierwszym renderze

export const AuthContext = createContext<ValueProp>(initialAuthContext);

interface ValueProp {
  token: null | string;
  user: null | User;
  isLoading: boolean;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  editUser: (newUserName: string) => Promise<void>;
  submitRegisterPressed: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username?: string | undefined;
  }) => Promise<void>;
  addToFavorites: (userMail: string, recipeUrl: string) => Promise<void>;
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
  const [errorMessage, setErrorMessage] = useState("");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [userHasFavorites, setUserHasFavorites] = useState<boolean>(false);
  // const [currentFavorites, setCurrentFavorites] = useState<string[]>([]);
  const [userHasRated, setUserHasRated] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const tryRefreshLogin = async () => {
    if (refreshToken) {
      const refreshedIdToken = await refreshIdToken(refreshToken);
      if (typeof refreshedIdToken === "string") {
        getUserData(refreshedIdToken);
      }
    }
  };
  useEffect(() => {
    tryRefreshLogin();
  }, []);

  const registerUserRequest = async (email: string, password: string) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        setErrorMessage(jsonResponse.error.message);
        return;
      }
      const idToken = jsonResponse.idToken;
      const refreshToken = jsonResponse.refreshToken;
      const userMail = jsonResponse.email;
      const registeredUser: User = {
        email: userMail,
      };
      setUser(registeredUser);
      setToken(idToken);
      setRefreshToken(refreshToken);
      putDataIntoLocalStorage(idToken, refreshToken);
      navigate("/");

      return { idToken, userMail };
    } catch (error) {
      console.log(error);
    }
  };

  const editUserRequest = async (token: string, username: string) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      idToken: token,
      displayName: username,
      photoUrl: "",
      returnSecureToken: true,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    const userMail = jsonResponse.email;
    const userName = jsonResponse.displayName;
    const registeredUser: User = {
      email: userMail,
      name: userName,
    };
    setUser(registeredUser);
  };

  const submitRegisterPressed = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await registerUserRequest(email, password);
      if (response?.idToken && username) {
        editUserRequest(response.idToken, username);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        console.log(jsonResponse.error.message);
        setErrorMessage(jsonResponse.error.message);
        return;
      }
      const loggedinUser: User = {
        email: jsonResponse.email,
        name: jsonResponse.displayName,
      };
      setUser(loggedinUser);
      setToken(jsonResponse.idToken);
      setRefreshToken(jsonResponse.refreshToken);
      putDataIntoLocalStorage(jsonResponse.idToken, jsonResponse.refreshToken);
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    } catch (error) {
      console.log("error: ", error);
    }

    setIsLoading(false);
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
    const refreshedIdToken = jsonResponse.id_token;
    setToken(refreshedIdToken);
    putDataIntoLocalStorage(jsonResponse.id_token, jsonResponse.refresh_token);
    setIsLoading(false);
    return refreshedIdToken;
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
    const refreshedUser: User = {
      email: jsonResponse.users[0].email,
      name: jsonResponse.users[0].displayName,
    };
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
    });
    const jsonResponse = response.json();
    if (typeof token === "string") {
      getUserData(token);
    }
  };

  //////////////////////////
  ///// favorites section

  const addToFavorites = async (userMail: string, recipeUrl: string) => {
    await getUsersInfo(userMail);
    console.log("userExists: ", userExists);
    if (userExists) {
      addNextFavorite(userMail, recipeUrl);
    } else {
      addUserAndFirstFavorite(userMail, recipeUrl);
    }
  };

  const getUsersFavorites = async (userMail: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json`;
    const response = await fetch(endpoint, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    return jsonResponse.favorites;
  };

  const addNextFavorite = async (userMail: string, recipeUrl: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json`;

    const currentFavorites = await getUsersFavorites(userMail);
    const body = {
      favorites: [...currentFavorites, recipeUrl],
    };
    const response = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const addUserAndFirstFavorite = async (
    userMail: string,
    recipeUrl: string
  ) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json`;
    const body = {
      favorites: [recipeUrl],
    };
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };

  const getUsersInfo = async (userMail: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    const response = await fetch(endpoint, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    if (jsonResponse[prepairEmail]) {
      setUserExists(true);
      if (jsonResponse[prepairEmail].favorites) {
        setUserHasFavorites(true);
      } else {
        setUserHasFavorites(false);
      }
      if (jsonResponse[prepairEmail].rated) {
        setUserHasRated(true);
      } else {
        setUserHasRated(false);
      }
    } else {
      setUserExists(false);
      setUserHasFavorites(false);
      setUserHasRated(false);
    }
  };

  const value: ValueProp = {
    token,
    user,
    isLoading: isLoading,
    errorMessage: errorMessage,
    setErrorMessage: setErrorMessage,
    loginUser: loginUser,
    logoutUser: logoutUser,
    editUser: editUser,
    submitRegisterPressed: submitRegisterPressed,
    addToFavorites: addToFavorites,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
