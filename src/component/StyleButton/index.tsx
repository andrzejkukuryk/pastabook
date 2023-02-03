import React from "react";
import "draft-js/dist/Draft.css";
import "../RichTextEditor/richText.css";

interface StyleButtonProps {
  active: boolean;
  style: string;
  label: JSX.Element;
  onToggle: (bockType: string) => void;
}

export const StyleButton = ({
  active,
  style,
  label,
  onToggle,
}: StyleButtonProps) => {
  const _onToggle = (e: any) => {
    e.preventDefault();
    onToggle(style);
  };

  const className = "RichEditor-styleButton";

  return (
    <button
      className={className + `${active ? " RichEditor-activeButton" : ""}`}
      onClick={_onToggle}
    >
      {label}
    </button>
  );
};
