import React from "react";
import styles from "./style.module.css";

const pastaTypes: string[] = ["spaghetti", "penne", "trofie", "tagliatelle"];

export function SearchByType() {
  return (
    <div className={styles.container}>
      <form>
        {pastaTypes.map((type, index) => (
          <label className={styles.listItemLabel} key={`pastaType${index}`}>
            <input type="checkbox" name="pastaType" value={type} />
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
