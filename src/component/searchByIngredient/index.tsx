import React from "react";
import styles from "./style.module.css";
import { allIngredients } from "../../recipesData";

const ingredients: string[] = [
  "tomato",
  "guanciale",
  "basil",
  "garlic",
  "olive oil",
  "pecorino",
  "parmigiano",
];

export function SearchByIngredient() {
  return (
    <div className={styles.container}>
      <form>
        {allIngredients.map((type, index) => (
          <label className={styles.listItemLabel} key={`ingredient${index}`}>
            <input type="checkbox" name="ingredient" value={type} />
            {type}
          </label>
        ))}
        <input
          type={"submit"}
          className={styles.searchButton}
          value={"search"}
        ></input>
      </form>
    </div>
  );
}
