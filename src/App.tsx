import React, { createContext, useState } from "react";
import "./App.css";
import { RecipeList } from "./component/recipeList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Recipe } from "./component/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { SharedLayout } from "./component/sharedLayout";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { AddRecipe } from "./component/addRecipe";
import { recipes } from "./data/dummyData";
import { SearchResultList } from "./component/searchResultList";

const AuthContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState(recipes);

  const fakeAuth = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("h3uu97975nvpwev7oqm63"), 250);
    });

  const handleLogin = async () => {
    //TODO: znowu type!!!!!
    const token: any = await fakeAuth();
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };
  console.log(token);

  return (
    <AuthContext.Provider value={token}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SharedLayout
                token={token}
                setToken={setToken}
                handleLogout={handleLogout}
                setSearchResult={setSearchResult}
              />
            }
          >
            <Route index element={<RecipeList />} />
            <Route path="recipes" />
            <Route path="recipes/:recipePath" element={<Recipe />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login handleLogin={handleLogin} />} />
            <Route path="add" element={<AddRecipe />} />
            <Route
              path="search"
              element={<SearchResultList searchResult={searchResult} />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
