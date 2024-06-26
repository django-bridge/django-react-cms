import { ReactElement } from "react";
import { WidgetDef } from "./base";
import Input from '@mui/joy/Input';
import { SxProps } from "@mui/joy/styles/types";

export default class TextInputDef implements WidgetDef {
  type: "text" | "email" | "url" | "password";

  variant: "default" | "large";

  constructor(
    type: TextInputDef["type"],
    variant: TextInputDef["variant"],
  ) {
    this.type = type;
    this.variant = variant;
  }

  render(
    id: string,
    name: string,
    disabled: boolean,
    value: string,
  ): ReactElement {
    let sx: SxProps = {};
    if (this.variant === "large") {
      sx = {
        ...sx,
        border: "none",
        boxShadow: "none",
        background: "none",
        fontSize: { xs: "30px", sm: "30px", md: "48px" },
        fontWeight: 700
      };
    }

    return (
      <Input
        sx={sx}
        id={id}
        type={this.type}
        name={name}
        defaultValue={value}
        disabled={disabled}
      />
    );
  }
}
