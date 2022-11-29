import React from "react";
import styles from "./style.module.css";
import logoPNG from "./graph/logo.png";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <div className={styles.container}>
        <img className={styles.image} src={logoPNG} alt="Pastabook"></img>
        <h1 className={styles.title}>Pastabook</h1>
      </div>
    </Link>
  );
}
