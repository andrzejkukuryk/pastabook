import React from "react";
import { Form } from "react-bootstrap";
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
    console.log("zmieniam ingredientId");
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
  console.log("temporary new ingrediets: ", temporaryNewIngredients);
  return (
    // <>
    //   <Form.Group controlId="ingredient" className="d-inline-block">
    //     <Form.Control
    //       type="text"
    //       placeholder="Type ingredient name"
    //       value={newIngredients[id].name}
    //       {...register("ingredient", {
    //         required: true,
    //         onChange(event) {
    //           handleChangeName(event);
    //         },
    //       })}
    //     />
    //     {errors.ingredient && errors.ingredient.type === "required" && (
    //       <p>Type some ingredient.</p>
    //     )}
    //   </Form.Group>
    //   <Form.Group controlId="main" className="d-inline-block">
    //     <Form.Check
    //       type="switch"
    //       label="main ingredient"
    //       checked={newIngredients[id].main}
    //       {...register("main", {
    //         onChange(event) {
    //           //deklaruję event, bo bez niego nie działa

    //           handleChangeMain();
    //         },
    //       })}
    //     />
    //   </Form.Group>
    //   <button
    //     type="button"
    //     onClick={() => handleClickRemove(id)}
    //     className="d-inline-block"
    //   >
    //     remove
    //   </button>
    // </>

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
