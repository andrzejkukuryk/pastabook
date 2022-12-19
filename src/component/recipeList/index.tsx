import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeListItem } from "../recipeListItem";
import styles from "./style.module.css";
import { recipes } from "../../data/dummyData";
import { ProtectedRoute } from "../protectedRoute";

export function RecipeList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.lastRecipesTitle}>Last recipes: </h2>

      <div className={styles.flexContainer}>
        {recipes.map((recipe) => (
          <Link to={`/recipes/${recipe.path}`} key={recipe.path}>
            <RecipeListItem
              dishName={recipe.fullName}
              imageSource={recipe.imageSource}
              rate={recipe.rate}
            />
          </Link>
        ))}
      </div>
      <div className={styles.addRecipe}>
        <Link to={"/add"}>
          <button>Add new recipe</button>
        </Link>
      </div>
    </div>
  );
}
