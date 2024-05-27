import { ReactElement } from "react";
import { WidgetDef } from "./base";
import BlockNoteEditor from "../../components/widgets/BlockNoteEditor";

export default class BlockNoteEditorDef implements WidgetDef {

  render(
    id: string,
    name: string,
    disabled: boolean,
    value: string,
  ): ReactElement {
    return (
      <BlockNoteEditor id={id} name={name} disabled={disabled} initialContent={JSON.parse(value || "[]")} />
    );
  }
}
