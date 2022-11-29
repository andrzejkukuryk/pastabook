import React from "react";
import "./App.css";
import { Logo } from "./component/logo";
import styles from "./style.module.css";
import { RecipeList } from "./component/recipeList";
import { UserLoginMenu } from "./component/userLoginMenu";
import { SearchMain } from "./component/searchMain";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Recipe } from "./component/recipe";
import { PageNotFound } from "./component/pageNotFound";
import { recipes } from "./recipesData";

function App() {
  return (
    <BrowserRouter>
      <header className={styles.header}>
        <Logo />
        <UserLoginMenu />
      </header>
      <SearchMain />
      <Routes>
        <Route path="/" element={<RecipeList />}></Route>
        <Route path="recipes">
          {recipes.map((recipe, index) => (
            <Route
              key={`route${index}`} //gdzie jeszcze dać key, żeby nie było warningu w konsoli?
              path={`/recipes/${recipe.path}`}
              element={
                <Recipe key={`recipe${index}`} dishName={recipe.fullName} /> //gdzie jeszcze dać key, żeby nie było warningu w konsoli?
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
