import React from "react";
import { Logo } from "../logo";
import { UserLoginMenu } from "../userLoginMenu";
import styles from "./style.module.css";


export function Header() {
  return (
    <div className={styles.container}>
      <Logo />
      <UserLoginMenu />
    </div>
  );
}
