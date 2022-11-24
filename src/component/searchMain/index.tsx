import React, { useState } from "react";
import { SearchByIngredient } from "../searchByIngredient";
import { SearchByName } from "../searchByName/searchByName";
import { SearchByType } from "../searchByType";
import styles from "./style.module.css";

const TYPE_BYNAME = "byName";
const TYPE_BYTYPE = "byType";
const TYPE_BYINGREDIENT = "byIngredient";

export function SearchMain() {
  const [choice, setChoice] = useState(TYPE_BYNAME);

  const searchChoice = () => {
    switch (choice) {
      case TYPE_BYNAME:
        return <SearchByName />;
      case TYPE_BYTYPE:
        return <SearchByType />;
      case TYPE_BYINGREDIENT:
        return <SearchByIngredient />;
      default:
        return <SearchByName />;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search by</h2>
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
