"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

import Toolbar from "./Toolbar"; // Our enhanced toolbar

export default function BlogEditor({ value, onChange }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Image,
      Link.configure({
        openOnClick: false,
      }),
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[300px] border rounded-b-md p-4 text-right outline-none",
        dir: "rtl",
      },
    },
  });

  return (
    <div className="border rounded-md overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
