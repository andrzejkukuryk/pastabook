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
import { Dish } from "../../models/dish";
import { useRecipeContext } from "../../data/recipeProvider";

export const TYPE_BYNAME = "byName";
export const TYPE_BYTYPE = "byType";
export const TYPE_BYINGREDIENT = "byIngredient";

interface SearchMainProps {
  setSearchResult: React.Dispatch<React.SetStateAction<Dish[]>>;
}

export function SearchMain({ setSearchResult }: SearchMainProps) {
  const [choice, setChoice] = useState(TYPE_BYNAME);
  const { recipes, allPastaTypes, allMainIngredients } = useRecipeContext();

  const initialTypeChecked: boolean[] = new Array(allPastaTypes.length).fill(
    false
  );
  const initialSelectedTypes: string[] = [];
  const initialIngredientsChecked: boolean[] = new Array(
    allMainIngredients.length
  ).fill(false);
  const initialSelectedIngredients: string[] = [];
  const initialSearchedPhrase: string = "";

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
  const [searchedPhrase, setSearchedPhrase] = useState(initialSearchedPhrase);
  const [filteredByName, setFilteredByName] = useState(recipes);

  // console.log("type checked: ", typeChecked);

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
    let newFilteredByIngredients: Dish[] = [];
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

  const filterByName = () => {
    let newFilteredByName: Dish[] = [];
    newFilteredByName = recipes.filter((recipe) =>
      recipe.fullName.toLowerCase().includes(searchedPhrase.toLowerCase())
    );
    setFilteredByName(newFilteredByName);
  };

  useEffect(() => filterByPastaType(), [selectedTypes]);
  useEffect(() => filterByIngredients(), [selectedIngredients]);
  useEffect(() => filterByName(), [searchedPhrase]);

  const searchResult = (searchType: string) => {
    let newSearchResult: Dish[] = [];
    if (searchType === TYPE_BYNAME) {
      setSearchResult(filteredByName);
    }
    if (searchType === TYPE_BYTYPE || searchType === TYPE_BYINGREDIENT) {
      const searchAreaPastaType =
        filteredByPastaType.length === 0
          ? [...recipes]
          : [...filteredByPastaType];
      const searchAreaIngredients =
        filteredByIngredients.length === 0
          ? [...recipes]
          : [...filteredByIngredients];
      newSearchResult = recipes.filter(
        (recipe) =>
          searchAreaPastaType.includes(recipe) &&
          searchAreaIngredients.includes(recipe)
      );
      setSearchResult(newSearchResult);
    }
  };

  const searchChoice = () => {
    switch (choice) {
      case TYPE_BYNAME:
        return (
          <SearchByName
            searchedPhrase={searchedPhrase}
            setSearchedPhrase={setSearchedPhrase}
            searchResult={searchResult}
          />
        );
      case TYPE_BYTYPE:
        return (
          <SearchByType
            typeChecked={typeChecked}
            chooseType={chooseType}
            chooseTypeHandler={chooseTypeHandler}
            searchResult={searchResult}
          />
        );
      case TYPE_BYINGREDIENT:
        return (
          <SearchByIngredient
            ingredientsChecked={ingredientsChecked}
            chooseIngredients={chooseIngredients}
            chooseIngredientsHandler={chooseIngredientsHandler}
            searchResult={searchResult}
          />
        );
      default:
        return (
          <SearchByName
            searchedPhrase={searchedPhrase}
            setSearchedPhrase={setSearchedPhrase}
            searchResult={searchResult}
          />
        );
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
