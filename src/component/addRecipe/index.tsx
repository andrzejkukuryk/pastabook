import React, { useState } from "react";
import styles from "./style.module.css";
import { AddRecipeIngredients } from "../addRecipeIngredients";
import { AddRecipeName } from "../addRecipeName";
import { AddRecipePastaType } from "../addRecipePastaType";

export interface NewIngredient {
  main: boolean;
  name: string;
  ingredientId?: number;
}

export function AddRecipe() {
  const intialNewIngredients: NewIngredient[] = [
    { main: false, name: "", ingredientId: 0 },
  ];

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newPastaType, setNewPastaType] = useState<string>("");
  const [newIngredients, setNewIngredients] =
    useState<NewIngredient[]>(intialNewIngredients);

  return (
    <div className={styles.container}>
      <h2>Add new recipe</h2>
      <AddRecipeName
        newRecipeName={newRecipeName}
        setNewRecipeName={setNewRecipeName}
      />
      <AddRecipePastaType setNewPastaType={setNewPastaType} />
      <AddRecipeIngredients
        newIngredients={newIngredients}
        setNewIngredients={setNewIngredients}
      />
    </div>
  );
}
