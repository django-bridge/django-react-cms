import React, { ReactElement } from "react";
import styled from "styled-components";
import { FormWidgetChangeNotificationContext } from "../../contexts";

const StyledTextInput = styled.input`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  color: #262626;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;

  .field-has-error & {
    border: 1px solid #d9303e;
  }

  &:disabled {
    background-color: hsl(0, 0%, 95%);
  }

  &:focus {
    border: 1px solid var(--joy-palette-primary-solidBg);
    outline: 1px solid var(--joy-palette-primary-solidBg);
  }
`;

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      onChange: originalOnChange,
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement>,
    ref,
  ): ReactElement => {
    const changeNotification = React.useContext(
      FormWidgetChangeNotificationContext,
    );

    return (
      <StyledTextInput
        type="text"
        ref={ref}
        onChange={(e) => {
          if (originalOnChange) {
            originalOnChange(e);
          }
          changeNotification();
        }}
        {...props}
      />
    );
  },
);

export default TextInput;
