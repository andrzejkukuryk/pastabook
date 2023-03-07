import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { useRecipeContext } from "../../data/recipeProvider";
import { Header } from "../header";
import { LoadingSpinner } from "../loadingSpinner";
import { Search } from "../search";

export function SharedLayout() {
  const { isLoading: isLoadingAuth } = useAuthContext();
  const { isLoadingRecipe } = useRecipeContext();

  useEffect(() => {});
  return (
    <div>
      <Header />
      <Search />
      <div style={{ position: "relative" }}>
        {(isLoadingRecipe || isLoadingAuth) && <LoadingSpinner />}
        <Outlet />
      </div>
    </div>
  );
}
