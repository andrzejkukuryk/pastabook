import React from "react";
import styles from "./style.module.css";
import { allMainIngredients } from "../../data/dummyData";

export function SearchByIngredient() {
  return (
    <div className={styles.container}>
      <form>
        {allMainIngredients.map((type, index) => (
          <label className={styles.listItemLabel} key={`ingredient${index}`}>
            <input type="checkbox" name="ingredient" value={type} />
            {type}
          </label>
        ))}
        <input
          type={"submit"}
          className={styles.searchButton}
          value={"search"}
        ></input>
      </form>
    </div>
  );
}
