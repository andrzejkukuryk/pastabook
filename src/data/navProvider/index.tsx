import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

const initialNavContext = {
  prevPath: "",
  listPage: 1,
  updateStatesForNavContext: () => {},
} as unknown as ValueProp;

export const NavContext = createContext<ValueProp>(initialNavContext);

interface ValueProp {
  prevPath: string;

  listPage: number;
  updateStatesForNavContext: (path: string, page: number) => void;
}

interface NavProviderProps {
  children?: ReactNode;
}

export const useNavContext = () => {
  return useContext(NavContext);
};

export const NavProvider: FC<NavProviderProps> = ({ children }) => {
  const [prevPath, setPrevPath] = useState("");
  const [listPage, setListPage] = useState(1);

  const updateStatesForNavContext = (path: string, page: number) => {
    setPrevPath(path);
    setListPage(page);
  };

  const value: ValueProp = {
    prevPath,
    listPage,
    updateStatesForNavContext,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};
