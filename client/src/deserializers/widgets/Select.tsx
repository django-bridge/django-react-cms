import { ReactElement } from "react";
import { WidgetDef } from "./base";
import Select from "../../components/widgets/Select";

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
    // Find the option that corresponds to the value
    let option = null;
    this.choices.forEach((choice) => {
      // HACK: Cast null value to and empty string as that's that value Django uses for the empty value of a ModelChoiceField
      // Also cast ints to string as Django may use both interchangably for model primary keys
      if (`${choice.value}` === `${value || ""}`) {
        option = choice;
      }
    });

    return (
      <Select
        id={id}
        name={name}
        defaultValue={option}
        options={this.choices}
        isDisabled={disabled}
        className={this.className}
      />
    );
  }
}
