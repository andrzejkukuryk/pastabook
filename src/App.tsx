import React from "react";
import "./App.css";
import { RecipeList } from "./component/recipeList";
import { SearchMain } from "./component/searchMain";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Recipe } from "./component/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { recipes } from "./recipesData";
import { Header } from "./component/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SearchMain />
      <Routes>
        <Route path="/" element={<RecipeList />}></Route>
        <Route path="recipes">
          {recipes.map((recipe, index) => (
            <Route
              key={`route${index}`} //gdzie jeszcze dać key, żeby nie było warningu w konsoli?
              path={`/recipes/${recipe.path}`}
              element={
                <Recipe
                  key={`recipe${index}`}
                  dishName={recipe.fullName}
                  ingredients={recipe.ingredients}
                  imageSource={recipe.imageSource}
                /> //gdzie jeszcze dać key, żeby nie było warningu w konsoli?
              }
            />
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
