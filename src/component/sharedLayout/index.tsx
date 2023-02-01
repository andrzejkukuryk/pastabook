import React from "react";
import { Outlet } from "react-router-dom";
import { Dish } from "../../models/dish";
import { Recipe } from "../../models/recipe";
import { Header } from "../header";
import { SearchMain } from "../searchMain";

import styles from "./style.module.css";

interface SharedLayoutProps {
  setSearchResult: React.Dispatch<React.SetStateAction<Dish[]>>;
}

export function SharedLayout({ setSearchResult }: SharedLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <SearchMain setSearchResult={setSearchResult} />
      <Outlet />
    </div>
  );
}