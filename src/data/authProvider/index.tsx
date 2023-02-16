import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dish } from "../../models/dish";

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
  removeFromFavorites: () => {},
  rateRecipe: () => {},
  currentFavorites: [],
  currentRated: [],
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
  removeFromFavorites: (userMail: string, recipeUrl: string) => Promise<void>;
  rateRecipe: (
    userMail: string,
    newRate: number,
    recipeUrl: string
  ) => Promise<void>;
  currentFavorites: string[];
  currentRated: string[];
}

interface AuthProviderProps {
  children?: ReactNode;
}

interface User {
  email: string;
  name?: string;
}

interface KeysPathsRates {
  key: string;
  path: string;
  rate: number[];
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
  const [isErrorAuth, setIsErrorAuth] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [userHasFavorites, setUserHasFavorites] = useState<boolean>(false);
  const [currentFavorites, setCurrentFavorites] = useState<string[]>([]);
  const [userHasRated, setUserHasRated] = useState<boolean>(false);
  const [currentRated, setCurrentRated] = useState<string[]>([]);
  const [recipesKeysPaths, setRecipesKeysPaths] = useState<KeysPathsRates[]>(
    []
  );

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

  useEffect(() => {
    if (user) {
      getUsersInfo(user?.email);
      getRecipesKeysPaths();
    }
  }, [user]);

  const registerUserRequest = async (email: string, password: string) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      setIsErrorAuth(false);
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
      setIsErrorAuth(true);
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

    try {
      setIsErrorAuth(false);
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
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
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
      setIsErrorAuth(false);
      const response = await registerUserRequest(email, password);
      if (response?.idToken && username) {
        editUserRequest(response.idToken, username);
      }
    } catch (error) {
      setIsErrorAuth(true);
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
      setIsErrorAuth(false);
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
      setIsErrorAuth(true);
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
    setCurrentFavorites([]);
    setUserExists(false);
    setUserHasFavorites(false);
    setUserHasRated(false);
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
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json();
      const refreshedIdToken = jsonResponse.id_token;
      setToken(refreshedIdToken);
      putDataIntoLocalStorage(
        jsonResponse.id_token,
        jsonResponse.refresh_token
      );
      return refreshedIdToken;
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
    setIsLoading(false);
  };

  const getUserData = async (token: string) => {
    setIsLoading(true);
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const data = {
      idToken: token,
    };
    try {
      setIsErrorAuth(false);
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
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
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
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const jsonResponse = response.json();
      if (typeof token === "string") {
        getUserData(token);
      }
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  //////////////////////////
  ///// favorites section

  const addToFavorites = async (userMail: string, recipeUrl: string) => {
    console.log("userExists: ", userExists);
    if (userExists) {
      addNextFavorite(userMail, recipeUrl);
    } else {
      addUserAndFirstFavorite(userMail, recipeUrl);
    }
    getUsersFavorites(userMail);
    getUsersInfo(userMail);
  };

  const getUsersFavorites = async (userMail: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json`;
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const jsonResponse = await response.json();
      if (jsonResponse.favorites) {
        console.log("get users favorites");
        setCurrentFavorites(jsonResponse.favorites);
      } else {
        setCurrentFavorites([]);
      }
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  const addNextFavorite = async (userMail: string, recipeUrl: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json?auth=${token}`;
    const body = {
      favorites: [...currentFavorites, recipeUrl],
    };
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      console.log("add next favorite");
      setCurrentFavorites(jsonResponse.favorites);
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  const addUserAndFirstFavorite = async (
    userMail: string,
    recipeUrl: string
  ) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json?auth=${token}`;
    const body = {
      favorites: [recipeUrl],
    };
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      console.log("add user and first favorite");
      setCurrentFavorites(jsonResponse.favorites);
      setUserExists(true);
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  const removeFromFavorites = async (userMail: string, recipeUrl: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json?auth=${token}`;
    const newFavorites = currentFavorites.filter((item) => item !== recipeUrl);
    const body = {
      favorites: newFavorites,
    };
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.favorites) {
        console.log("remove from favorites");
        setCurrentFavorites(jsonResponse.favorites);
      } else {
        setCurrentFavorites([]);
      }
      getUsersInfo(userMail);
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  ///////////////////////////
  ////// rating section

  const getRecipesKeysPaths = async () => {
    const endpoint =
      "https://pastabook-e1b8c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
    const response = await fetch(endpoint, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    const downloadedKeys: [string, Dish][] = Object.entries(jsonResponse);
    const temporaryKeysPaths: KeysPathsRates[] = [];
    downloadedKeys.forEach((item) => {
      const data = {
        key: item[0],
        path: item[1].dishName.toLowerCase().replace(/\s+/g, ""),
        rate: item[1].rate,
      };
      temporaryKeysPaths.push(data);
    });
    setRecipesKeysPaths(temporaryKeysPaths);
  };

  const addRate = async (newRate: number, recipeUrl: string) => {
    const recipeForUpdate = recipesKeysPaths.filter(
      (recipe) => recipe.path === recipeUrl
    );
    const keyToUpdate = recipeForUpdate[0].key;
    const endpoint = `https://pastabook-e1b8c-default-rtdb.europe-west1.firebasedatabase.app/recipes/${keyToUpdate}.json?auth=${token}`;
    const body = {
      rate: [...recipeForUpdate[0].rate, newRate],
    };
    const response = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return response;
  };

  const rateRecipe = async (
    userMail: string,
    newRate: number,
    recipeUrl: string
  ) => {
    const response = await addRate(newRate, recipeUrl);
    console.log("userExists ", userExists);
    if (response.ok) {
      if (userExists) {
        addNextRated(userMail, recipeUrl);
      } else {
        addUserAndFirstRated(userMail, recipeUrl);
      }
    }
    getUsersInfo(userMail);
  };

  // useEffect(() => {
  //   rateRecipe("tata@domek.pl", 1, "fortests");
  // }, []);
  // console.log("current rated: ", currentRated);
  // console.log("currentFavorites ", currentFavorites);

  const addUserAndFirstRated = async (userMail: string, recipeUrl: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json?auth=${token}`;
    const body = {
      rated: [recipeUrl],
    };
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      setCurrentRated(jsonResponse.rated);
      setUserExists(true);
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
    }
  };

  const addNextRated = async (userMail: string, recipeUrl: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users/${prepairEmail}.json?auth=${token}`;
    const body = {
      rated: [...currentRated, recipeUrl],
    };
    const response = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    setCurrentRated(jsonResponse.rated);
  };
  // useEffect(() => {
  //   addRate(3, "fortests");
  // }, [user]);

  const getUsersInfo = async (userMail: string) => {
    const prepairEmail = userMail.replace(/\W/g, "").toLowerCase();
    const endpoint = `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    try {
      setIsErrorAuth(false);
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const jsonResponse = await response.json();
      if (jsonResponse[prepairEmail]) {
        setUserExists(true);
        if (jsonResponse[prepairEmail].favorites) {
          console.log(
            "jsonResponse[prepairEmail].favorites",
            jsonResponse[prepairEmail].favorites
          );
          setCurrentFavorites(jsonResponse[prepairEmail].favorites);
          setUserHasFavorites(true);
        } else {
          setCurrentFavorites([]);
          setUserHasFavorites(false);
        }
        if (jsonResponse[prepairEmail].rated) {
          setCurrentRated(jsonResponse[prepairEmail].rated);
          setUserHasRated(true);
        } else {
          setCurrentRated([]);
          setUserHasRated(false);
        }
      } else {
        setUserExists(false);
        setUserHasFavorites(false);
        setUserHasRated(false);
      }
    } catch (error) {
      setIsErrorAuth(true);
      console.log(error);
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
    removeFromFavorites: removeFromFavorites,
    rateRecipe: rateRecipe,
    currentFavorites: currentFavorites,
    currentRated: currentRated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
