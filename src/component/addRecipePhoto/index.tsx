import React from "react";
import { DragDrop } from "../dragDrop";
import styles from "./style.module.css";

export function AddRecipePhoto() {
  return (
    <div className="mt-2 col-lg-4 col-md-6 col-xs-12">
      <DragDrop />
    </div>
  );
}
