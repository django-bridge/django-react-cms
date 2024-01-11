import React, { ReactElement } from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
  GroupBase,
} from "react-select";
import styled from "styled-components";
import { FormWidgetChangeNotificationContext } from "../../contexts";

const StyledSelect = styled(ReactSelect)`
  width: 100%;
  font-size: 1rem;

  .field-has-error & > div {
    border: 1px solid #d9303e;
  }
`;

const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  control: (base, state) => ({
    ...base,
    backgroundColor: "#f9f9f9",
    borderRadius: "0.5rem",
    padding: "3px",
    boxShadow: state.isFocused
      ? "0 0 0 1px var(--joy-palette-primary-solidBg)"
      : "0",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    borderColor: state.isFocused
      ? "var(--joy-palette-primary-solidBg)"
      : "#e0e0e0",
    "&:hover": {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      borderColor: state.isFocused
        ? "var(--joy-palette-primary-solidBg)"
        : base.borderColor,
    },
  }),
  option: (base, state) => ({
    ...base,
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isDisabled
      ? undefined
      : // eslint-disable-next-line no-nested-ternary
        state.isSelected
        ? "var(--joy-palette-primary-solidBg)"
        : state.isFocused
          ? "#f2fcfc"
          : undefined,

    "&:hover": {
      cursor: "pointer",
    },
  }),
};
function Select({
  onChange: originalOnChange,
  ...props
}: ReactSelectProps): ReactElement {
  const changeNotification = React.useContext(
    FormWidgetChangeNotificationContext,
  );

  return (
    <StyledSelect
      {...props}
      styles={customStyles}
      onChange={(newValue, actionMeta) => {
        if (originalOnChange) {
          originalOnChange(newValue, actionMeta);
        }
        changeNotification();
      }}
    />
  );
}

export default Select;
