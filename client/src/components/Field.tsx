import React, { ReactElement } from "react";
import styled from "styled-components";
import Errors from "./Errors";

const FieldWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  &.widget-float-left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;
  }
`;

// Only used when the widget is floated to the left (see the toggle inputs in any fields settings/validation tabs)
const LeftFloatedWidgetWrapper = styled.div``;

const StyledLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: #2e1f5e;
  margin-bottom: 3px;

  span {
    color: #d9303e;
  }

  // Used on relationships form on model settings
  &.bold {
    font-size: 17px;
    font-weight: 700;
  }
`;

const HelpTextWrapper = styled.div`
  margin-top: 4px;
  font-size: 13px;
  line-height: 16px;
  color: #767676;

  svg {
    display: inline;
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
  }
`;

export interface FieldProps {
  idForLabel: string;
  label: string;
  required: boolean;
  widget: ReactElement;
  helpText?: string;
  displayOptions?: {
    helpTextAboveWidget?: boolean;
    boldLabel?: boolean;
    widgetFloatLeft?: boolean;
    focusOnMount?: boolean;
    hideRequiredAsterisk?: boolean;
  };
  errors: string[];
}

function Field({
  idForLabel,
  label,
  required,
  widget,
  helpText,
  displayOptions,
  errors,
}: FieldProps): ReactElement {
  // Focus on mount
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (displayOptions?.focusOnMount && wrapperRef.current) {
      const inputElement = wrapperRef.current.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [displayOptions?.focusOnMount]);

  return (
    <FieldWrapper
      className={
        (errors.length ? "field-has-error" : "") +
        (displayOptions?.widgetFloatLeft ? " widget-float-left" : "")
      }
      ref={wrapperRef}
    >
      {/* Render the widget up here if floated left */}
      {displayOptions?.widgetFloatLeft && (
        <LeftFloatedWidgetWrapper>{widget}</LeftFloatedWidgetWrapper>
      )}
      <div>
        <StyledLabel
          htmlFor={idForLabel}
          className={displayOptions?.boldLabel ? "bold" : ""}
        >
          {label}
          {required && !displayOptions?.hideRequiredAsterisk && <span>*</span>}
        </StyledLabel>
        {(displayOptions?.helpTextAboveWidget && (
          <>
            {/* Safe to use dangerouslySetInnerHTML as help text is defined in code */}
            {helpText && (
              <HelpTextWrapper dangerouslySetInnerHTML={{ __html: helpText }} />
            )}
            {!displayOptions?.widgetFloatLeft && widget}
          </>
        )) || (
          <>
            {!displayOptions?.widgetFloatLeft && widget}
            {/* Safe to use dangerouslySetInnerHTML as help text is defined in code */}
            {helpText && (
              <HelpTextWrapper dangerouslySetInnerHTML={{ __html: helpText }} />
            )}
          </>
        )}
        {!!errors.length && <Errors errors={errors} />}
      </div>
    </FieldWrapper>
  );
}

export default Field;
