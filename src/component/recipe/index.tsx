import React from "react";
import styles from "./style.module.css";

interface RecipeProps {
  dishName: string;
  ingredients: string[];
  imageSource: string;
}

export function Recipe({ dishName, ingredients, imageSource }: RecipeProps) {
  return (
    <div className={styles.container}>
      <h2>{dishName}</h2>
      <img className={styles.image} src={imageSource} alt={dishName}></img>
      <div>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient: string) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
