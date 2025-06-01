import React from "react";

export const CSRFTokenContext = React.createContext<string>("");

export interface URLs {
  pages_index: string;
  files_index: string;
}

export const URLsContext = React.createContext<URLs>({
  pages_index: "",
  files_index: "",
});


