import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className={styles.container}>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/">go back to homepage</Link>
    </div>
  );
}
