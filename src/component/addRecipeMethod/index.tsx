import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import "./style.css";

interface AddRecipeMethodProps {
  setNewMethod: React.Dispatch<any>;
  methodHasText: boolean;
  setMethodHasText: React.Dispatch<React.SetStateAction<boolean>>;
  validated: boolean;
  setValidated: (value: React.SetStateAction<boolean>) => void;
}

export function AddRecipeMethod({
  setNewMethod,
  methodHasText,
  setMethodHasText,
  validated,
  setValidated,
}: AddRecipeMethodProps) {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    setNewMethod(content);
    setValidated(false);
  }, [content]);

  const error = validated && !methodHasText;

  const divClass = classNames({
    "RichEditorRoot col-xl-4 col-lg-5 col-md-6 col-12": true,
    "red-border": error,
  });

  return (
    <div className={divClass}>
      <RichTextEditor
        setContent={setContent}
        setMethodHasText={setMethodHasText}
      />
    </div>
  );
}
