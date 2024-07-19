import React from "react";
import { DirtyFormMarker } from "@django-bridge/react";
import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import {
  BlockNoteView,
  Theme,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./BlockNoteEditor.css";

const lightTheme = {
  ...lightDefaultTheme,
  colors: {
    ...lightDefaultTheme.colors,
    editor: {
      text: "inherit",
      background: "none",
    },
  },
  borderRadius: 0,
  fontFamily: "inherit",
} satisfies Theme;

const darkTheme = {
  ...darkDefaultTheme,
  colors: {
    ...lightDefaultTheme.colors,
    editor: {
      text: "inherit",
      background: "none",
    },
  },
  borderRadius: 0,
  fontFamily: "inherit",
} satisfies Theme;

interface BlockNoteEditorProps {
  id: string;
  name: string;
  disabled: boolean;
  initialContent: Block[];
}

export default function BlockNoteEditor({
  name,
  initialContent,
}: BlockNoteEditorProps) {
  const [blocks, setBlocks] = React.useState<Block[]>(initialContent);
  const [dirty, setDirty] = React.useState(false);
  const editor = useCreateBlockNote({ initialContent });

  return (
    <>
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />
      {dirty && <DirtyFormMarker />}
      <BlockNoteView
        editor={editor}
        onChange={() => {
          setBlocks(editor.document);
          setDirty(true);
        }}
        theme={{
          light: lightTheme,
          dark: darkTheme,
        }}
      />
    </>
  );
}
