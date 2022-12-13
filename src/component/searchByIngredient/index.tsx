import React from "react";
import styles from "./style.module.css";
import { allMainIngredients } from "../../data/dummyData";
import { useNavigate } from "react-router-dom";
import { TYPE_BYINGREDIENT } from "../searchMain";

interface SearchByIngredientProps {
  ingredientsChecked: boolean[];
  chooseIngredients: (position: number) => void;
  chooseIngredientsHandler: (ingredient: string) => void;
  searchResult: (searchType: string) => void;
}

export function SearchByIngredient({
  ingredientsChecked,
  chooseIngredients,
  chooseIngredientsHandler,
  searchResult,
}: SearchByIngredientProps) {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search");
    searchResult(TYPE_BYINGREDIENT);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
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
