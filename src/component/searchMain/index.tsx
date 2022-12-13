import React, { useEffect, useState } from "react";
import { SearchByIngredient } from "../searchByIngredient";
import { SearchByName } from "../searchByName/searchByName";
import { SearchByType } from "../searchByType";
import styles from "./style.module.css";
import {
  allMainIngredients,
  allPastaTypes,
  recipes,
} from "../../data/dummyData";
import { Recipe } from "../../models/recipe";

const TYPE_BYNAME = "byName";
const TYPE_BYTYPE = "byType";
const TYPE_BYINGREDIENT = "byIngredient";

export function SearchMain() {
  const [choice, setChoice] = useState(TYPE_BYNAME);

  const initialTypeChecked: boolean[] = new Array(allPastaTypes.length).fill(
    false
  );
  const initialSelectedTypes: string[] = [];
  const initialIngredientsChecked: boolean[] = new Array(
    allMainIngredients.length
  ).fill(false);
  const initialSelectedIngredients: string[] = [];

  const [typeChecked, setTypeChecked] = useState(initialTypeChecked);
  const [selectedTypes, setSelectedTypes] = useState(initialSelectedTypes);
  const [filteredByPastaType, setFilteredByPastaType] = useState(recipes);
  const [ingredientsChecked, setIngredientsChecked] = useState(
    initialIngredientsChecked
  );
  const [selectedIngredients, setSelectedIngredients] = useState(
    initialSelectedIngredients
  );
  const [filteredByIngredients, setFilteredByIngredients] = useState(recipes);

  const chooseType = (position: number): void => {
    const updatedTypeChecked: boolean[] = typeChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeChecked(updatedTypeChecked);
  };

  const chooseIngredients = (position: number): void => {
    const updatedIngredientsChecked: boolean[] = ingredientsChecked.map(
      (item, index) => (index === position ? !item : item)
    );
    setIngredientsChecked(updatedIngredientsChecked);
  };

  const chooseTypeHandler = (type: string) => {
    let newSelectedTypes: string[] = [];

    if (selectedTypes.includes(type)) {
      newSelectedTypes = [...selectedTypes].filter((value) => value !== type);
    } else {
      newSelectedTypes = [...selectedTypes, type];
    }

    setSelectedTypes(newSelectedTypes);
  };

  const chooseIngredientsHandler = (ingredient: string) => {
    let newSelectedIngredients: string[] = [];

    if (selectedIngredients.includes(ingredient)) {
      newSelectedIngredients = [...selectedIngredients].filter(
        (value) => value !== ingredient
      );
    } else {
      newSelectedIngredients = [...selectedIngredients, ingredient];
    }

    setSelectedIngredients(newSelectedIngredients);
  };

  const filterByPastaType = () => {
    setFilteredByPastaType(
      recipes.filter((recipe) =>
        selectedTypes.includes(recipe.pastaType.toLowerCase())
      )
    );
  };

  const filterByIngredients = () => {
    let newFilteredByIngredients: Recipe[] = [];
    selectedIngredients.forEach((ingrenient) => {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.mainIngredients.includes(ingrenient)
      );
      newFilteredByIngredients = [
        ...newFilteredByIngredients,
        ...filteredRecipes,
      ];
    });
    const uniqueFilteredByIngredients = newFilteredByIngredients.filter(
      (item, index) => {
        return newFilteredByIngredients.indexOf(item) === index;
      }
    );
    setFilteredByIngredients(uniqueFilteredByIngredients);
  };

  useEffect(() => filterByPastaType(), [selectedTypes]);
  useEffect(() => filterByIngredients(), [selectedIngredients]);

  console.log(
    "Selected ingredients: ",
    selectedIngredients,
    "By ingredients: ",
    filteredByIngredients
    // "By ingredients: ",
    // filteredByIngredients
  );

  const searchChoice = () => {
    switch (choice) {
      case TYPE_BYNAME:
        return <SearchByName />;
      case TYPE_BYTYPE:
        return (
          <SearchByType
            typeChecked={typeChecked}
            chooseType={chooseType}
            chooseTypeHandler={chooseTypeHandler}
          />
        );
      case TYPE_BYINGREDIENT:
        return (
          <SearchByIngredient
            ingredientsChecked={ingredientsChecked}
            chooseIngredients={chooseIngredients}
            chooseIngredientsHandler={chooseIngredientsHandler}
          />
        );
      default:
        return <SearchByName />;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search&nbsp;by</h2>
      <div className={styles.searchChoiceDiv}>
        <div className={styles.searchButtonsDiv}>
          <button onClick={() => setChoice(TYPE_BYNAME)}>name</button>
          <button onClick={() => setChoice(TYPE_BYTYPE)}>pasta type</button>
          <button onClick={() => setChoice(TYPE_BYINGREDIENT)}>
            main ingredient
          </button>
        </div>
        <div>{searchChoice()}</div>
      </div>
    </div>
  );
}
