import InputProps from "@mui/joy/Input/InputProps";
import { SxProps } from "@mui/joy/styles/types";
import Input from '@mui/joy/Input';
import { DirtyFormMarker } from "@django-render/core";
import React from "react";

export interface TextInputProps extends InputProps {
  avariant: "default" | "large",
}

export default function TextInput({ avariant, onChange: originalOnChange, ...props }: TextInputProps) {
  const [dirty, setDirty] = React.useState(false);

  let sx: SxProps = props.sx || {};
  if (avariant === "large") {
    sx = {
      ...sx,
      border: "none",
      boxShadow: "none",
      background: "none",
      fontSize: { xs: "30px", sm: "30px", md: "48px" },
      fontWeight: 700
    };
  }

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty(true);

    if (originalOnChange) {
      originalOnChange(e);
    }
  }, [originalOnChange]);

  return (
    <>
      {dirty && <DirtyFormMarker />}
      <Input
        {...props}
        sx={sx}
        onChange={onChange}
      />
    </>
  );
}
