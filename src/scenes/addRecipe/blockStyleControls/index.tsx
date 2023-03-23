import React from "react";
import { EditorState } from "draft-js";
import { StyleButton } from "../styleButton";
import { ReactComponent as BiTypeH1 } from "../../../assets/bi-type-h1.svg";
import { ReactComponent as BiQuote } from "../../../assets/bi-quote.svg";
import { ReactComponent as BiListUl } from "../../../assets/bi-list-ul.svg";
import { ReactComponent as BiListOl } from "../../../assets/bi-list-ol.svg";
import "draft-js/dist/Draft.css";
import "../richTextEditor/richText.css";

const headerIcon = <BiTypeH1 />;

const quoteIcon = <BiQuote />;

const ulIcon = <BiListUl />;

const olIcon = <BiListOl />;

const BLOCK_TYPES = [
  // { label: "H1", style: "header-one" },
  // { label: "H2", style: "header-two" },
  // { label: "H3", style: "header-three" },
  { label: headerIcon, style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  { label: quoteIcon, style: "blockquote" },
  { label: ulIcon, style: "unordered-list-item" },
  { label: olIcon, style: "ordered-list-item" },
  // { label: "Code Block", style: "code-block" },
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
      {BLOCK_TYPES.map((type, index) => (
        <StyleButton
          key={`block${index}`}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
