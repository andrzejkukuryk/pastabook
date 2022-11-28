import React from "react";
import { RecipeListItem } from "../recipeListItem";
import styles from "./style.module.css";
import { recipes } from "../../recipesData";

console.log(recipes);

export function RecipeList() {
  return (
    <div className={styles.container}>
      <h2 className={styles.lastRecipesTitle}>Last recipes:</h2>

      <div className={styles.flexContainer}>
        {recipes.map((recipe) => (
          <RecipeListItem
            dishName={recipe.fullName()}
            imageSource={recipe.imageSource}
            rate={recipe.rate}
          />
        ))}
      </div>
    </div>
  );
}
