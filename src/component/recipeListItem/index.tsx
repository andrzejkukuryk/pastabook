import React from "react";
import { RecipeRatingStars } from "../recipeRatingStars";
import styles from "./style.module.css";

interface RecipeListItemProps {
  imageSource: string;
  dishName: string;
  rate: number;
}

export function RecipeListItem({
  dishName,
  imageSource,
  rate,
}: RecipeListItemProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.imageDiv}
        style={{ backgroundImage: `URL(${imageSource})` }}
      ></div>
      <h3 className={styles.dishTitle}>{dishName}</h3>
      <RecipeRatingStars rate={rate} />
    </div>
  );
}
