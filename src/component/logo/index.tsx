import React from "react";
import styles from "./style.module.css";
import logoPNG from "./graph/logo.png";

export function Logo() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={logoPNG} alt="Pastabook"></img>
      <h1 className={styles.title}>Pastabook</h1>
    </div>
  );
}
