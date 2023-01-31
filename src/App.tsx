import React, { useState } from "react";
import "./App.css";
import { RecipeList } from "./component/recipeList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider, useAuthContext } from "./component/authProvider";
import { Recipe } from "./component/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { SharedLayout } from "./component/sharedLayout";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { AddRecipe } from "./component/addRecipe";
// import { recipes } from "./data/dummyData";
import { SearchResultList } from "./component/searchResultList";
import { ProtectedRoute } from "./component/protectedRoute";
import { UserProfile } from "./component/userProfile";
import { UserProfileEdit } from "./component/userProfileEdit";
import { RecipeProvider, useRecipeContext } from "./data/recipeProvider";
import "./css/main.css";

function App() {
  const { recipes } = useRecipeContext();
  const [searchResult, setSearchResult] = useState(recipes);

  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <Routes>
            <Route
              path="/"
              element={<SharedLayout setSearchResult={setSearchResult} />}
            >
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
                    <AddRecipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="search"
                element={<SearchResultList searchResult={searchResult} />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
