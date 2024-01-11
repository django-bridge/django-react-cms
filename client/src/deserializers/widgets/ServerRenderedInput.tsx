import React, { ReactElement } from "react";
import { WidgetDef } from "./base";

export interface ServerRenderedInputProps {
  html: string;
  id: string;
  name: string;
  value: string;
}

export function ServerRenderedInput({
  html,
  id,
  name,
  value,
}: ServerRenderedInputProps): ReactElement {
  // Set the initial value of the input
  const fieldWrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (fieldWrapperRef.current) {
      // eslint-disable-next-line no-restricted-syntax
      fieldWrapperRef.current.querySelectorAll("input").forEach((input) => {
        if (input.type === "checkbox" && Array.isArray(value)) {
          // Checkbox select multiple
          input.checked =
            value
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              .map((i) => `${i}`)
              .indexOf(input.value) !== -1;
        } else {
          input.value = value;
        }
      });
    }
  }, [value]);

  // FIXME: Check if there are any inputs and hook up dirty form checks

  return (
    <div
      ref={fieldWrapperRef}
      dangerouslySetInnerHTML={{
        __html: html.replaceAll("__ID__", id).replaceAll("__NAME__", name),
      }}
    />
  );
}

export default class ServerRenderedInputDef implements WidgetDef {
  html: string;

  idForLabel: string;

  constructor(html: string, idForLabel: string) {
    this.html = html;
    this.idForLabel = idForLabel;
  }

  render(
    id: string,
    name: string,
    _disabled: boolean,
    value: string,
  ): ReactElement {
    return (
      <ServerRenderedInput html={this.html} id={id} name={name} value={value} />
    );
  }

  getIdForLabel(id: string): string {
    return this.idForLabel.replace("__ID__", id);
  }
}
