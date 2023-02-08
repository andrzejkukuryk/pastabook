import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RecipeList } from "./component/recipeList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider, useAuthContext } from "./data/authProvider";
import { Recipe } from "./component/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { SharedLayout } from "./component/sharedLayout";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { AddRecipe } from "./component/addRecipe";
import { AddNewRecipe } from "./component/addNewRecipe";
import { SearchResultList } from "./component/searchResultList";
import { ProtectedRoute } from "./component/protectedRoute";
import { UserProfile } from "./component/userProfile";
import { UserProfileEdit } from "./component/userProfileEdit";
import { RecipeProvider, useRecipeContext } from "./data/recipeProvider";
//@ts-ignore
import Breakpoints from "breakpoints-js";
// import "./css/main.css";
Breakpoints();

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<RecipeList />} />
              <Route path="pastabook" element={<RecipeList />} />
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
                path="editprofile"
                element={
                  <ProtectedRoute>
                    <UserProfileEdit />
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
