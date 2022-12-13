import React from "react";
import styles from "./style.module.css";
import { allPastaTypes } from "../../data/dummyData";

interface SearchByTypeProps {
  typeChecked: boolean[];
  chooseType: (position: number) => void;
  chooseTypeHandler: (type: string) => void;
}

export function SearchByType({
  typeChecked,
  chooseType,
  chooseTypeHandler,
}: SearchByTypeProps) {
  return (
    <div className={styles.container}>
      <form>
        {allPastaTypes.map((type, index) => (
          <label className={styles.listItemLabel} key={`pastaType${index}`}>
            <input
              type="checkbox"
              name="pastaType"
              value={type}
              checked={typeChecked[index]}
              onChange={() => {
                chooseTypeHandler(type);
                chooseType(index);
              }}
            />
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
