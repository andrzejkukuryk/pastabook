import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { SearchMain } from "../searchMain";

import styles from "./style.module.css";

export function SharedLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <SearchMain />
      <Outlet />
    </div>
  );
}
