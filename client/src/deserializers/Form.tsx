import { ReactElement } from "react";
import FieldDef from "./Field";
import { Alert } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";

export interface Tab {
  label: string;
  fields: string[];
  errorCount: number;
}

export function getInitialTab(tabs: Tab[]): Tab {
  return tabs.find((tab) => tab.errorCount > 0) || tabs[0];
}

interface FormRenderOptions {
  hideRequiredAsterisks?: boolean;
}
export default class FormDef {
  fields: FieldDef[];

  errors: { [field: string]: string[] };

  constructor(fields: FieldDef[], errors: FormDef["errors"]) {
    this.fields = fields;
    this.errors = errors;
  }

  render(renderOptions: FormRenderOptions = {}): ReactElement {
    // eslint-disable-next-line no-underscore-dangle
    const formErrors = this.errors.__all__;

    return (
      <>
        {!!formErrors && (
          <Alert color="danger">
            <ul>
              {formErrors.map((error) => (
                <li key={error}>
                  <WarningIcon fontSize="small" /> {error}
                </li>
              ))}
            </ul>
          </Alert>
        )}
        {this.fields.map((field, fieldIndex) => (
          <div key={field.name}>
            {field.render(this.errors[field.name] || [], {
              focusOnMount: fieldIndex === 0,
              hideRequiredAsterisk: renderOptions.hideRequiredAsterisks,
            })}
          </div>
        ))}
      </>
    );
  }
}
