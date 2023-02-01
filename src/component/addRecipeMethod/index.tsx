import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import styles from "./style.module.css";

interface AddRecipeMethodProps {
  setNewMethod: React.Dispatch<any>;
  setMethodHasText: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddRecipeMethod({
  setNewMethod,
  setMethodHasText,
}: AddRecipeMethodProps) {
  const [content, setContent] = useState<any>({});

  useEffect(() => setNewMethod(content), [content]);

  return (
    <div className={styles.container}>
      <p>Method</p>
      <div className={styles.RichEditorRoot}>
        <RichTextEditor
          setContent={setContent}
          setMethodHasText={setMethodHasText}
        />
      </div>
    </div>
  );
}