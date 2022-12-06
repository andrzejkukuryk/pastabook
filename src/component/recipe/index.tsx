import React from "react";
import { Link, useParams } from "react-router-dom";
import { recipes } from "../../data/dummyData";
import { Recipe as RecipeType } from "../../models/recipe";
import styles from "./style.module.css";

interface RecipeProps {
  fullName: string;
  imageSource: string;
  ingredients: string[];
}

export function Recipe() {
  const { recipePath } = useParams();

  const recipe: RecipeType | undefined = recipes.find(
    (rcp) => rcp.path === recipePath
  );

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
      {!recipe && <p>There's no such dish here</p>}
      <Link to="/">Back to home page</Link>
    </div>
  );
}
