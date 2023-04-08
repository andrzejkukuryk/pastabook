import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../data/authProvider";
import { useRecipeContext } from "../../../data/recipeProvider";
import { Header } from "../header/header";
import { LoadingSpinner } from "../../../component/loadingSpinner";
import { Search } from "../search/search";

export function SharedLayout() {
  const { isLoading: isLoadingAuth } = useAuthContext();
  const { isLoadingRecipe } = useRecipeContext();
  const location = useLocation();

  const showSearch = () => {
    const path = location.pathname;
    switch (path) {
      case "/profile":
      case "/login":
      case "/register":
        return false;
      default:
        return true;
    }
  };

  return (
    <div>
      <Header />
      {showSearch() && <Search />}
      <div className="outletContainer">
        {(isLoadingRecipe || isLoadingAuth) && <LoadingSpinner />}
        <Outlet />
      </div>
    </div>
  );
}
