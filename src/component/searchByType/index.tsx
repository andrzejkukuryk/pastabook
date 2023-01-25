import React from "react";
import styles from "./style.module.css";
import { allPastaTypes } from "../../data/dummyData";
import { useNavigate } from "react-router-dom";
import { TYPE_BYTYPE } from "../searchMain";
import { useRecipeContext } from "../../data/recipeProvider";

interface SearchByTypeProps {
  typeChecked: boolean[];
  chooseType: (position: number) => void;
  chooseTypeHandler: (type: string) => void;
  searchResult: (searchType: string) => void;
}

export function SearchByType({
  typeChecked,
  chooseType,
  chooseTypeHandler,
  searchResult,
}: SearchByTypeProps) {
  const { allPastaTypes } = useRecipeContext();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search");
    searchResult(TYPE_BYTYPE);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
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
