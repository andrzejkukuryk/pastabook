import React, { useState } from "react";
import styles from "./style.module.css";
import { users } from "../../data/dummyUsersData";
import iconNotLogged from "./graph/not_logged.png";

export function UserLoginMenu() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(users[0]);

  if (loggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loginP}>
          <p className={styles.greetingP}>Hello, {user.username}!</p>
          <p className={styles.accountSettingsP}>
            <a href="#">Account settings</a>
          </p>
        </div>
        <img className={styles.iconNotLogged} src={iconNotLogged} alt=""></img>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.loginP}>
        <a href="#">Log in</a> &nbsp;|&nbsp; <a href="#">Sign up</a>
      </p>
      <img className={styles.iconNotLogged} src={iconNotLogged} alt=""></img>
    </div>
  );
}
