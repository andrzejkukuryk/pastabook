import React from "react";
import "draft-js/dist/Draft.css";
import "../RichTextEditor/richText.css";
import classNames from "classnames";

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

  const buttonClass = classNames({
    "RichEditor-styleButton": true,
    "RichEditor-activeButton": active,
  });

  return (
    <button
      className={buttonClass}
      onClick={_onToggle}
      onMouseDown={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
};
