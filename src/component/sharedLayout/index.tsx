import React from "react";
import { Outlet } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";
import { Header } from "../header";
import { Search } from "../search";

export function SharedLayout() {
  const { isErrorRecipe } = useRecipeContext();

  return (
    <div>
      {isErrorRecipe && <p>Vaffanapoli! Something went wrong.</p>}
      <Header />
      <Search />
      <Outlet />
    </div>
  );
}
