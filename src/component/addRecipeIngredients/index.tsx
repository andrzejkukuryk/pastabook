import React from "react";
import { NewIngredient } from "../addRecipe";
import { AddRecipeIngredientsItem } from "../addRecipeIngredientsItem";
import styles from "./style.module.css";

interface AddRecipeIngredientsProps {
  newIngredients: NewIngredient[];
  setNewIngredients: React.Dispatch<React.SetStateAction<NewIngredient[]>>;
}

export function AddRecipeIngredients({
  newIngredients,
  setNewIngredients,
}: AddRecipeIngredientsProps) {
  const createIngredientsList = () => {
    return newIngredients.map((item, id) => (
      <AddRecipeIngredientsItem
        key={`ingredient${id}`}
        newIngredients={newIngredients}
        id={id}
        setNewIngredients={setNewIngredients}
      />
    ));
  };

  const handleClickAddIngredient = () => {
    setNewIngredients([
      ...newIngredients,
      { main: false, name: "", ingredientId: 0 },
    ]);
  };
  return (
    <div className={styles.container}>
      <div>
        <p>Ingredients</p>
        <p>Mark 2-3 main ingredients</p>
      </div>

      <div>
        {createIngredientsList()}
        <button onClick={() => handleClickAddIngredient()}>
          Add ingredient
        </button>
      </div>
    </div>
  );
}
