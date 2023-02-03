import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import styles from "./style.module.css";
import "./style.css";

interface AddRecipeMethodProps {
  setNewMethod: React.Dispatch<any>;
  methodHasText: boolean;
  setMethodHasText: React.Dispatch<React.SetStateAction<boolean>>;
  validated: boolean;
}

export function AddRecipeMethod({
  setNewMethod,
  methodHasText,
  setMethodHasText,
  validated,
}: AddRecipeMethodProps) {
  const [content, setContent] = useState<any>({});

  useEffect(() => setNewMethod(content), [content]);

  const error = validated && !methodHasText;

  const setRedBorder = () => {
    if (error) {
      return " red-border";
    }
  };

  return (
    <div
      className={"RichEditorRoot col-lg-4 col-md-6 col-xs-12" + setRedBorder()}
    >
      <RichTextEditor
        setContent={setContent}
        setMethodHasText={setMethodHasText}
      />
    </div>
  );
}
