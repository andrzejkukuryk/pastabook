import React from "react";
import { DragDrop } from "../dragDrop";
import styles from "./style.module.css";

export function AddRecipePhoto() {
  return (
    <div className={styles.container}>
      <p>Photo</p>
      <DragDrop />
    </div>
  );
}
