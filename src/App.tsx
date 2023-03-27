import React from "react";
import "./App.css";
import { RecipeList } from "./scenes/displayRecipes/recipeList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./data/authProvider";
import { Recipe } from "./scenes/recipe/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { SharedLayout } from "./component/sharedLayout";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { AddNewRecipe } from "./scenes/addRecipe/addNewRecipe";
import { SearchResultList } from "./scenes/displayRecipes/searchResultList";
import { ProtectedRoute } from "./component/protectedRoute";
import { UserProfile } from "./component/userProfile";
import { RecipeProvider } from "./data/recipeProvider";

function App() {
  return (
    <BrowserRouter basename="/pastabook">
      <AuthProvider>
        <RecipeProvider>
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
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
