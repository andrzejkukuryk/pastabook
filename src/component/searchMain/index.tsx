import React, { useEffect, useState } from "react";
import { SearchByIngredient } from "../searchByIngredient";
import { SearchByName } from "../searchByName/searchByName";
import { SearchByType } from "../searchByType";
import styles from "./style.module.css";
import { allPastaTypes, recipes } from "../../data/dummyData";
import { Recipe } from "../../models/recipe";

const TYPE_BYNAME = "byName";
const TYPE_BYTYPE = "byType";
const TYPE_BYINGREDIENT = "byIngredient";

export function SearchMain() {
  const [choice, setChoice] = useState(TYPE_BYNAME);
  const [typeChecked, setTypeChecked] = useState(
    new Array(allPastaTypes.length).fill(false)
  );
  const [selectedTypes, setSelectedTypes] = useState(allPastaTypes);

  const chooseType = (position: number): void => {
    const updatedTypeChecked: boolean[] = typeChecked.map((item, index) =>
      index === position ? !item : item
    );
    setTypeChecked(updatedTypeChecked);
  };

  const selectTypes = () => {
    let newSelectedTypes: string[] = [];
    allPastaTypes.map((pastaType, index) => {
      if (typeChecked[index]) {
        newSelectedTypes.push(pastaType);
      }
    });
    if (newSelectedTypes.length > 0) {
      setSelectedTypes(newSelectedTypes);
    }
  };

  useEffect(() => selectTypes(), [typeChecked]);
  console.log("selected pasta types: ", selectedTypes);

  const searchChoice = () => {
    switch (choice) {
      case TYPE_BYNAME:
        return <SearchByName />;
      case TYPE_BYTYPE:
        return (
          <SearchByType typeChecked={typeChecked} chooseType={chooseType} />
        );
      case TYPE_BYINGREDIENT:
        return <SearchByIngredient />;
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
