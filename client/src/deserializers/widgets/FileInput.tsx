import { ReactElement } from "react";
import FileInput from "../../components/widgets/FileInput";
import { WidgetDef } from "./base";

export default class FileInputDef implements WidgetDef {
  idForLabel: string;

  className: string;

  accept: string;

  maxFileSizeDisplay: string;

  constructor(
    idForLabel: string,
    className: string,
    accept: string,
    maxFileSizeDisplay: string,
  ) {
    this.idForLabel = idForLabel;
    this.className = className;
    this.accept = accept;
    this.maxFileSizeDisplay = maxFileSizeDisplay;
  }

  render(
    id: string,
    name: string,
    disabled: boolean,
    value: string,
  ): ReactElement {
    return (
      <FileInput
        id={id}
        name={name}
        defaultValue={value}
        disabled={disabled}
        className={this.className}
        accept={this.accept}
        maxFileSizeDisplay={this.maxFileSizeDisplay}
      />
    );
  }

  getIdForLabel(id: string): string {
    return this.idForLabel.replace("__ID__", id);
  }
}
