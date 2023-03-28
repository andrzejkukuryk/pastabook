import React from "react";
import { EditorState } from "draft-js";
import { StyleButton } from "../styleButton";
import { ReactComponent as BiTypeItalic } from "../../../assets/bi-type-italic.svg";
import { ReactComponent as BiTypeBold } from "../../../assets/bi-type-bold.svg";
import { ReactComponent as BiTypeUnderline } from "../../../assets/bi-type-underline.svg";

const boldIcon = <BiTypeBold />;

const italicIcon = <BiTypeItalic />;

const underlineIcon = <BiTypeUnderline />;

const INLINE_STYLES = [
  { label: boldIcon, style: "BOLD" },
  { label: italicIcon, style: "ITALIC" },
  { label: underlineIcon, style: "UNDERLINE" },
  // { label: "Monospace", style: "CODE" },
];

interface InlineStyleControlsProps {
  editorState: EditorState;
  onToggle: (bockType: string) => void;
}

export const InlineStyleControls = ({
  editorState,
  onToggle,
}: InlineStyleControlsProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          key={`inline${index}`}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
