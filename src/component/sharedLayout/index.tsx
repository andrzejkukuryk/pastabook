import React from "react";
import { Outlet } from "react-router-dom";
import { Recipe } from "../../models/recipe";
import { Header } from "../header";
import { SearchMain } from "../searchMain";

import styles from "./style.module.css";

interface SharedLayoutProps {
  token: null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
  handleLogout: () => void;
  setSearchResult: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function SharedLayout({
  token,
  setToken,
  setSearchResult,
  handleLogout,
}: SharedLayoutProps) {
  return (
    <div className={styles.container}>
      <Header token={token} setToken={setToken} handleLogout={handleLogout} />
      <SearchMain setSearchResult={setSearchResult} />
      <Outlet />
    </div>
  );
}
