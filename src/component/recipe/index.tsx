import React from "react";
import styles from "./style.module.css";

interface RecipeProps {
  dishName: string;
}

export function Recipe({ dishName }: RecipeProps) {
  return (
    <div className={styles.container}>
      <h2>{dishName}</h2>
    </div>
  );
}
