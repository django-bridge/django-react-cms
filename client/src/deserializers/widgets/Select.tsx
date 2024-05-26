import { ReactElement } from "react";
import { WidgetDef } from "./base";
import { Select, Option } from "@mui/joy";

export default class SelectDef implements WidgetDef {
  choices: { label: string; value: string }[];

  className: string;

  constructor(
    choices: { label: string; value: string }[],
    className: string,
  ) {
    this.choices = choices;
    this.className = className;
  }

  render(
    id: string,
    name: string,
    disabled: boolean,
    value: string,
  ): ReactElement {
    // Find the default value
    let defaultValue = null;
    this.choices.forEach((choice) => {
      // Cast null value to and empty string as that's that value Django uses for the empty value of a ModelChoiceField
      // Also cast ints to string as Django may use both interchangably for model primary keys
      if (`${choice.value}` === `${value || ""}`) {
        defaultValue = choice.value;
      }
    });

    return (
      <>
      <Select id={id} name={name} defaultValue={defaultValue} disabled={disabled} className={this.className}>
        {this.choices.map((choice) => <Option value={choice.value}>{choice.label}</Option>)}
      </Select>
      </>
    );
  }
}
