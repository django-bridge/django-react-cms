import React from "react";

export const CSRFTokenContext = React.createContext<string>("");

export interface URLs {
  posts_index: string;
  media_index: string;
}

export const URLsContext = React.createContext<URLs>({
    posts_index: "",
  media_index: "",
});


