import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@radix-ui/themes";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";
import styled from "styled-components";

type NotesActionsBarProps = {
  editor?: Editor | null;
};

const Header = styled.div`
  position: sticky;
  width: 100%;
  border-radius: var(--radius-3) var(--radius-3) 0 0;
  top: var(--space-1);
  display: flex;
  align-items: center;
  background-color: var(--gray-contrast);
  z-index: 30;
  gap: var(--space-2);
  padding: var(--space-3);
`;

export const NotesActionsBar: React.FC<NotesActionsBarProps> = ({ editor }) => {
  return (
    <Header>
      <Button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        variant={editor?.isActive("bold") ? "soft" : "outline"}
        type="button"
      >
        <Bold size="16" />
      </Button>
      <Button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={editor?.isActive("heading", { level: 1 }) ? "soft" : "outline"}
      >
        <Heading1 size="16" />
      </Button>

      <Button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={editor?.isActive("heading", { level: 2 }) ? "soft" : "outline"}
      >
        <Heading2 size="16" />
      </Button>

      <Button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={editor?.isActive("heading", { level: 3 }) ? "soft" : "outline"}
      >
        <Heading3 size="16" />
      </Button>
      <Button
        type="button"
        onClick={() => editor?.chain()?.focus().toggleBulletList().run()}
        variant={editor?.isActive("bulletList") ? "soft" : "outline"}
      >
        <List size="16" />
      </Button>

      <Button
        type="button"
        onClick={() => editor?.chain()?.focus().toggleOrderedList().run()}
        variant={editor?.isActive("orderedList") ? "soft" : "outline"}
      >
        <ListOrdered size="16" />
      </Button>
    </Header>
  );
};
