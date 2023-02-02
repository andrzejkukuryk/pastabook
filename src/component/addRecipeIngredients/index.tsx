import React, { useState } from "react";
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
  const [toManyMainIngredients, setToManyMainIngredients] =
    useState<boolean>(false);
  const createIngredientsList = () => {
    return newIngredients.map((item, id) => (
      <AddRecipeIngredientsItem
        key={`ingredient${id}`}
        newIngredients={newIngredients}
        id={id}
        setNewIngredients={setNewIngredients}
        setToManyMainIngredients={setToManyMainIngredients}
      />
    ));
  };

  /////////////
  // orginal

  // const handleClickAddIngredient = () => {
  //   setNewIngredients([
  //     ...newIngredients,
  //     { main: false, name: "", ingredientId: 0 },
  //   ]);
  // };

  ////
  /////////////

  const handleClickAddIngredient = () => {
    debugger;
    const temporaryNewIngredients = [...newIngredients];
    temporaryNewIngredients.push({ main: false, name: "", ingredientId: 0 });
    setNewIngredients(temporaryNewIngredients);
  };

  console.log("newIngredients state: ", newIngredients);
  return (
    <div className={styles.container}>
      <div>
        <p>Ingredients</p>
        <p>Mark 2-3 main ingredients</p>
        {toManyMainIngredients && <p>To many main ingredients</p>}
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
