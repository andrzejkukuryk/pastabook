import React from "react";
import styles from "./style.module.css";
import { allMainIngredients } from "../../data/dummyData";

interface SearchByIngredientProps {
  ingredientsChecked: boolean[];
  chooseIngredients: (position: number) => void;
  chooseIngredientsHandler: (ingredient: string) => void;
}

export function SearchByIngredient({
  ingredientsChecked,
  chooseIngredients,
  chooseIngredientsHandler,
}: SearchByIngredientProps) {
  return (
    <div className={styles.container}>
      <form>
        {allMainIngredients.map((ingredient, index) => (
          <label className={styles.listItemLabel} key={`ingredient${index}`}>
            <input
              type="checkbox"
              name="ingredient"
              value={ingredient}
              checked={ingredientsChecked[index]}
              onChange={() => {
                chooseIngredients(index);
                chooseIngredientsHandler(ingredient);
              }}
            />
            {ingredient}
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
