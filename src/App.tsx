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
import { recipes } from "./data/dummyData";
import { SearchResultList } from "./component/searchResultList";
import { ProtectedRoute } from "./component/protectedRoute";
function App() {
  const [searchResult, setSearchResult] = useState(recipes);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<SharedLayout setSearchResult={setSearchResult} />}
          >
            <Route index element={<RecipeList />} />
            <Route path="recipes" />
            <Route path="recipes/:recipePath" element={<Recipe />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
