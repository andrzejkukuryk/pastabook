import React from "react";
import styles from "./style.module.css";

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
        {ingredients.map((type, index) => (
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
