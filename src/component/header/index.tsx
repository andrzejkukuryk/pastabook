import React from "react";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";
import styles from "./style.module.css";

interface HeaderProps {
  token: null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
  handleLogout: () => void;
}

export function Header({ token, setToken, handleLogout }: HeaderProps) {
  return (
    <div className={styles.container}>
      <Logo />
      <UserLoginMenu
        token={token}
        setToken={setToken}
        handleLogout={handleLogout}
      />
    </div>
  );
}
