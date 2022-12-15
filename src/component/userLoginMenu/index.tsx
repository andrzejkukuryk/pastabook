import React, { useState } from "react";
import styles from "./style.module.css";
import { users } from "../../data/dummyUsersData";
import { Link } from "react-router-dom";
import iconNotLogged from "./graph/not_logged.png";

interface UserLoginMenuProps {
  token: null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
  handleLogout: () => void;
}

export function UserLoginMenu({
  token,
  setToken,
  handleLogout,
}: UserLoginMenuProps) {
  const [user, setUser] = useState(users[0]);

  if (token) {
    return (
      <div className={styles.container}>
        <div className={styles.loginP}>
          <p className={styles.greetingP}>Hello, {user.username}!</p>
          <p className={styles.accountSettingsP}>
            <a href="#">Account settings</a>
            <button onClick={() => handleLogout()}>Logout</button>
          </p>
        </div>
        <img className={styles.iconNotLogged} src={iconNotLogged} alt=""></img>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.loginP}>
        <Link to="login">Login</Link> &nbsp;|&nbsp;
        <Link to="register">Sign up</Link>
      </p>
      <img className={styles.iconNotLogged} src={iconNotLogged} alt=""></img>
    </div>
  );
}
