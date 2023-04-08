import React from "react";
import "./App.css";
import { RecipeList } from "./scenes/displayRecipes/recipeList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./data/authProvider";
import { Recipe } from "./scenes/recipe/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { SharedLayout } from "./scenes/sharedLayout/sharedLayout";
import { Login } from "./scenes/login";
import { Register } from "./scenes/register";
import { AddNewRecipe } from "./scenes/addRecipe/addNewRecipe";
import { SearchResultList } from "./scenes/displayRecipes/searchResultList";
import { ProtectedRoute } from "./component/protectedRoute";
import { UserProfile } from "./scenes/userProfile/userProfile";
import { RecipeProvider } from "./data/recipeProvider";
import { NavProvider } from "./data/navProvider";

function App() {
  return (
    <BrowserRouter basename="/pastabook">
      <AuthProvider>
        <RecipeProvider>
          <NavProvider>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<RecipeList />} />
                <Route path="recipes" />
                <Route path="recipes/:recipePath" element={<Recipe />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="add"
                  element={
                    <ProtectedRoute>
                      <AddNewRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route path="search" element={<SearchResultList />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </NavProvider>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
