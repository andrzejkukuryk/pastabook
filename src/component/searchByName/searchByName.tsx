import React from "react";
import styles from "./style.module.css";
import { TYPE_BYNAME } from "../searchMain";
import { Link, useNavigate } from "react-router-dom";

interface SearchByNameProps {
  searchedPhrase: string;
  setSearchedPhrase: (phrase: string) => void;
  searchResult: (searchType: string) => void;
}

export function SearchByName({
  searchedPhrase,
  setSearchedPhrase,
  searchResult,
}: SearchByNameProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search");
    searchResult(TYPE_BYNAME);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          className={styles.textInput}
          value={searchedPhrase}
          onChange={(e) => setSearchedPhrase(e.target.value)}
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
