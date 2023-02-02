import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import styles from "./style.module.css";
import "./style.css";

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
    <div className="RichEditorRoot col-lg-4 col-md-6 col-xs-12">
      <RichTextEditor
        setContent={setContent}
        setMethodHasText={setMethodHasText}
      />
    </div>
  );
}
