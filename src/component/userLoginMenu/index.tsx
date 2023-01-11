import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import iconNotLogged from "./graph/not_logged.png";
import { useAuthContext } from "../authProvider";

export function UserLoginMenu() {
  const { token, user, logoutUser } = useAuthContext();

  if (token) {
    return (
      <div className={styles.container}>
        <div className={styles.loginP}>
          <p className={styles.greetingP}>{user && `Hello, ${user}!`}</p>
          <p className={styles.accountSettingsP}>
            <a href="#">Account settings</a>
            <button onClick={logoutUser}>Logout</button>
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
