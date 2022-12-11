import React from "react";
import styles from "./style.module.css";
import { allMainIngredients } from "../../data/dummyData";

interface SearchByIngredientProps {
  ingredientsChecked: boolean[];
  chooseIngredients: (position: number) => void;
}

export function SearchByIngredient({
  ingredientsChecked,
  chooseIngredients,
}: SearchByIngredientProps) {
  return (
    <div className={styles.container}>
      <form>
        {allMainIngredients.map((type, index) => (
          <label className={styles.listItemLabel} key={`ingredient${index}`}>
            <input
              type="checkbox"
              name="ingredient"
              value={type}
              checked={ingredientsChecked[index]}
              onChange={() => chooseIngredients(index)}
            />
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
