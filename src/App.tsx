import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<RecipeList />} />
          <Route path="recipes" />
          <Route path="recipes/:recipePath" element={<Recipe />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="add" element={<AddRecipe />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
