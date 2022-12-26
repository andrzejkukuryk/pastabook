import React from "react";
import { EditorState } from "draft-js";
import { StyleButton } from "../StyleButton";
import "draft-js/dist/Draft.css";
import "../RichTextEditor/richText.css";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "Unordered List", style: "unordered-list-item" },
  { label: "Ordered List", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

interface BlockStyleControlsProps {
  editorState: EditorState;
  onToggle: (bockType: string) => void;
}

export const BlockStyleControls = ({
  editorState,
  onToggle,
}: BlockStyleControlsProps) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
