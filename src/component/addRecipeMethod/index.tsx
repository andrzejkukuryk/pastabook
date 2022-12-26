import React, { useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import styles from "./style.module.css";

export function AddRecipeMethod() {
  const [content, setContent] = useState<any>({});
  console.log(content);
  return (
    <div className={styles.container}>
      <p>Method</p>
      <RichTextEditor setContent={setContent} />
    </div>
  );
}
