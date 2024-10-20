import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@radix-ui/themes";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";
import "./notes-styles.scss";

type NotesProps = {
  content?: string;
  onChange?: (content: string) => void;
};

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
  });

  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="notes">
      <div className="header">
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
          variant={
            editor?.isActive("heading", { level: 1 }) ? "soft" : "outline"
          }
        >
          <Heading1 size="16" />
        </Button>

        <Button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor?.isActive("heading", { level: 2 }) ? "soft" : "outline"
          }
        >
          <Heading2 size="16" />
        </Button>

        <Button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor?.isActive("heading", { level: 3 }) ? "soft" : "outline"
          }
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
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
