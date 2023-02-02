import React from "react";
import "draft-js/dist/Draft.css";
import "../RichTextEditor/richText.css";

interface StyleButtonProps {
  active: boolean;
  style: string;
  label: JSX.Element;
  onToggle: (bockType: string) => void;
}
const headerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-type-h1"
    viewBox="0 0 16 16"
  >
    <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
  </svg>
);

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
