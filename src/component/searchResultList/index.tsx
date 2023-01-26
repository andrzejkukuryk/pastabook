import React from "react";
import { Link } from "react-router-dom";
import { Dish } from "../../models/dish";
import { Recipe } from "../../models/recipe";
import { RecipeListItem } from "../recipeListItem";
import styles from "./style.module.css";

interface SearchResultListProps {
  searchResult: Dish[];
}

export function SearchResultList({ searchResult }: SearchResultListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.foundRecipesTitle}>Found recipes:</h2>

      <div className={styles.flexContainer}>
        {searchResult.map((recipe) => (
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
