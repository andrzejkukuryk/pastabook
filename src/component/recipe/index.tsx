import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../authProvider";
import { recipes } from "../../data/dummyData";
import { Recipe as RecipeType } from "../../models/recipe";
import styles from "./style.module.css";
import { Dish } from "../../models/dish";
import { useRecipeContext } from "../../data/recipeProvider";

export function Recipe() {
  const { recipePath } = useParams();
  const { recipes } = useRecipeContext();

  const recipe: Dish | undefined = recipes.find(
    (rcp) => rcp.path === recipePath
  );

  const { token } = useAuthContext();

  return (
    <div className={styles.container}>
      <h2>{recipe?.fullName}</h2>
      <img
        className={styles.image}
        src={recipe?.imageSource}
        alt={recipe?.fullName}
      ></img>
      <div>
        {recipe && <h3>Ingredients:</h3>}
        <ul>
          {recipe?.ingredients.map((ingredient: string, index: number) => (
            <li key={`ingredient${recipe?.fullName}${index}`}>{ingredient}</li>
          ))}
        </ul>
      </div>
      {/* TODO: lista ulubionych */}
      {token && <div>Add this recipe to your favorites</div>}
      {!recipe && <p>There's no such dish here</p>}
      <Link to="/">Back to home page</Link>
    </div>
  );
}
