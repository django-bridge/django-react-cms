import React, { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";

export interface FieldProps {
  label: string;
  required: boolean;
  widget: ReactElement;
  helpText?: string;
  displayOptions?: {
    focusOnMount?: boolean;
    hideRequiredAsterisk?: boolean;
  };
  errors: string[];
}

function Field({
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
    <FormControl error={!!errors.length}>
      <FormLabel>
        {label}{required && !displayOptions?.hideRequiredAsterisk && <span>*</span>}
      </FormLabel>
      {widget}
      {helpText && (
        <FormHelperText dangerouslySetInnerHTML={{ __html: helpText }} />
      )}
      <FormHelperText>
        {!!errors.length && (
          <ul>
            {errors.map((error) => (
              <li key={error}>
                <WarningIcon fontSize="small" /> {error}
              </li>
            ))}
          </ul>
        )}
      </FormHelperText>
    </FormControl>
  );
}

export default Field;
