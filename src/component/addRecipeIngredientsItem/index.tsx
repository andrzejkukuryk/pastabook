import React from "react";
import { useForm } from "react-hook-form";
import { NewIngredient } from "../addRecipe";
import styles from "./style.module.css";

interface AddRecipeIngredientsItemProps {
  newIngredients: NewIngredient[];
  id: number;
  setNewIngredients: React.Dispatch<React.SetStateAction<NewIngredient[]>>;
  setToManyMainIngredients: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddRecipeIngredientsItem({
  newIngredients,
  id,
  setNewIngredients,
  setToManyMainIngredients,
}: AddRecipeIngredientsItemProps) {
  const {
    register,
    formState: { errors },
  } = useForm();

  let temporaryNewIngredients: NewIngredient[] = [];
  newIngredients.forEach((ingredient, id) => {
    ingredient.ingredientId = id;
    temporaryNewIngredients.push(ingredient);
  });

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    temporaryNewIngredients[id].name = event.target.value;
    setNewIngredients(temporaryNewIngredients);
  };

  const handleChangeMain = () => {
    temporaryNewIngredients[id].main = !temporaryNewIngredients[id].main;
    setNewIngredients(temporaryNewIngredients);
  };

  const handleClickRemove = (ingredientIdToRemove: number) => {
    console.log("ingredientIdToremove: ", ingredientIdToRemove);
    temporaryNewIngredients.splice(ingredientIdToRemove, 1);
    setNewIngredients(temporaryNewIngredients);
  };

  const countMainIngredients = () => {
    let mainCounter: number = 0;
    newIngredients.forEach((ingredient) => {
      if (ingredient.main && ingredient.name) {
        mainCounter++;
      }
    });
    if (mainCounter > 3) {
      setToManyMainIngredients(true);
    } else {
      setToManyMainIngredients(false);
    }
  };

  countMainIngredients();
  return (
    <div className={styles.container}>
      <form>
        <input
          type="checkbox"
          checked={newIngredients[id].main}
          {...register("main", {
            onChange(event) {
              //deklaruję event, bo bez niego nie działa

              handleChangeMain();
            },
          })}
        />
        <input
          type="text"
          placeholder="Type new ingredient"
          value={newIngredients[id].name}
          {...(register("ingredient"),
          {
            required: true,
            onChange(event) {
              handleChangeName(event);
            },
          })}
        />
        <button type="button" onClick={() => handleClickRemove(id)}>
          remove
        </button>
        {errors.ingredient && errors.ingredient.type === "required" && (
          <p>Type some ingredient.</p>
        )}
      </form>
    </div>
  );
}
