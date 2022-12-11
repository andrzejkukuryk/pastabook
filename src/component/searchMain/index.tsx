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
  const initialIngredientsChecked: boolean[] = new Array(
    allMainIngredients.length
  ).fill(false);

  const [typeChecked, setTypeChecked] = useState(initialTypeChecked);
  const [selectedTypes, setSelectedTypes] = useState(allPastaTypes);
  const [filteredByPastaType, setFilteredByPastaType] = useState(recipes);
  const [ingredientsChecked, setIngredientsChecked] = useState(
    initialIngredientsChecked
  );
  const [selectedIngredients, setSelectedIngredients] =
    useState(allMainIngredients);
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

  const selectTypes = () => {
    const newSelectedTypes: string[] = [];
    allPastaTypes.forEach((pastaType, index) => {
      if (typeChecked[index]) {
        newSelectedTypes.push(pastaType);
      }
    });
    if (newSelectedTypes.length > 0) {
      setSelectedTypes(newSelectedTypes);
    }
  };
  // Propozycja Ani
  const chooseTypeHandler = (type: string) => {
    let newSelectedTypes: string[] = [];

    if (selectedTypes.includes(type)) {
      newSelectedTypes = [...selectedTypes].filter((value) => value !== type);
    } else {
      newSelectedTypes = [...selectedTypes, type];
    }

    setSelectedTypes(newSelectedTypes);
  };
  // (koniec)
  const selectIngredients = () => {
    const newSelectedIngredients: string[] = [];
    allMainIngredients.forEach((mainIngredient, index) => {
      if (ingredientsChecked[index]) {
        newSelectedIngredients.push(mainIngredient);
      }
    });
    if (newSelectedIngredients.length > 0) {
      setSelectedIngredients(newSelectedIngredients);
    }
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

  useEffect(() => selectTypes(), [typeChecked]);
  useEffect(() => filterByPastaType(), [selectedTypes]);
  useEffect(() => selectIngredients(), [ingredientsChecked]);
  useEffect(() => filterByIngredients(), [selectedIngredients]);

  console.log(
    "By type: ",
    filteredByPastaType,
    "By ingredients: ",
    filteredByIngredients
  );

  const searchChoice = () => {
    switch (choice) {
      case TYPE_BYNAME:
        return <SearchByName />;
      case TYPE_BYTYPE:
        return (
          <SearchByType typeChecked={typeChecked} chooseType={chooseType} />
        );
      case TYPE_BYINGREDIENT:
        return (
          <SearchByIngredient
            ingredientsChecked={ingredientsChecked}
            chooseIngredients={chooseIngredients}
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
