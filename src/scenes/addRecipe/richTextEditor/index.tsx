import React, { useState, useRef } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
  DraftHandleValue,
  convertToRaw,
  RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./richText.css";

import { BlockStyleControls } from "../blockStyleControls";
import { InlineStyleControls } from "../InlineStyleControls";

interface RichTextEditorProps {
  setContent: (state: RawDraftContentState) => void;
  setMethodHasText: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RichTextEditor = ({
  setContent,
  setMethodHasText,
}: RichTextEditorProps) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  const onChange = (state: EditorState) => {
    setEditorState(state);
    setContent(convertToRaw(editorState.getCurrentContent()));
  };

  const mapKeyToEditorCommand = (e: any): string | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  setMethodHasText(editorState.getCurrentContent().hasText());

  return (
    <>
      <div className="RichEditor-controls d-inline-block">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <div className="RichEditor-controls d-inline-block">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      </div>
      <div className="RichEditor-editor">
        <Editor
          ref={editorRef}
          editorState={editorState}
          placeholder="Type a method"
          customStyleMap={styleMap}
          blockStyleFn={(block: ContentBlock) => getBlockStyle(block)}
          keyBindingFn={(e) => mapKeyToEditorCommand(e)}
          onChange={onChange}
          spellCheck={true}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
};
