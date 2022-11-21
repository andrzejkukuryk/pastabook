import React from "react";
import styles from "./style.module.css";

export function SearchByName() {
  return (
    <div className={styles.container}>
      <form>
        <input
          type={"text"}
          className={styles.textInput}
          placeholder={"search for a recipe..."}
        ></input>
        <input
          type={"submit"}
          className={styles.searchButton}
          value={"search"}
        ></input>
      </form>
    </div>
  );
}
