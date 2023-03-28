import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import { useRecipeContext } from "../../data/recipeProvider";
import { Header } from "../../scenes/header/header";
import { LoadingSpinner } from "../loadingSpinner";
import { Search } from "../../scenes/search/search";

export function SharedLayout() {
  const { isLoading: isLoadingAuth } = useAuthContext();
  const { isLoadingRecipe } = useRecipeContext();

  useEffect(() => {});
  return (
    <div>
      <Header />
      <Search />
      <div className="outletContainer">
        {(isLoadingRecipe || isLoadingAuth) && <LoadingSpinner />}
        <Outlet />
      </div>
    </div>
  );
}
