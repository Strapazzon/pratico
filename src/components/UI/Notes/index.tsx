import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { NotesActionsBar } from "./actionsBar";
import styled from "styled-components";

type NotesProps = {
  content?: string;
  onChange?: (content: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45rem;
  background-color: var(--gray-contrast);
  border-radius: 0 0 var(--radius-3) var(--radius-3);
  height: -webkit-fill-available;
  overflow-y: scroll;
  .notes-editor {
    outline: none;
    padding: var(--space-3);
  }
`;

export const Notes: React.FC<NotesProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "notes-editor",
      },
    },
    content,
  });

  useEffect(() => {
    if (content && editor) {
      if (editor.getHTML() === content) return;
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <>
      <NotesActionsBar editor={editor} />
      <Wrapper>
        <EditorContent editor={editor} />
      </Wrapper>
    </>
  );
};
