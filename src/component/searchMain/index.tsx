import { stringify } from "querystring";
import React, { useState } from "react";
import { SearchByIngredient } from "../searchByIngredient";
import { SearchByName } from "../searchByName/searchByName";
import { SearchByType } from "../searchByType";
import styles from "./style.module.css";

const TYPE_BYNAME: string = "byName";
const TYPE_BYTYPE: string = "byType";
const TYPE_BYINGREDIENT: string = "byIngredient";

export function SearchMain() {
  const [choice, setChoice] = useState(TYPE_BYINGREDIENT);


  const handleButtonClick = ({ target }: any) => {
    setChoice(target.value);
  };

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
          <button onClick={handleButtonClick} value={TYPE_BYNAME}>
            name
          </button>
          <button onClick={handleButtonClick} value={TYPE_BYTYPE}>
            pasta type
          </button>
          <button onClick={handleButtonClick} value={TYPE_BYINGREDIENT}>
            main ingredient
          </button>
        </div>
        <div>{searchChoice()}</div>
      </div>
    </div>
  );
}
