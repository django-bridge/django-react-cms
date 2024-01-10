import React from "react";
import ReactDOM from "react-dom/client";
import * as Djream from "@djream/core";
import "./index.css";

import HomeView from "./views/Home";
import PostIndexView from "./views/PostIndex";
import MediaIndexView from "./views/MediaIndex";

// Add your views here
const djreamConfig = new Djream.Config();
djreamConfig.addView("Home", HomeView);
djreamConfig.addView("PostIndex", PostIndexView);
djreamConfig.addView("MediaIndex", MediaIndexView);

const rootElement = document.getElementById("root")!;
const initialResponse = rootElement.dataset.initialResponse!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Djream.App
      config={djreamConfig}
      initialResponse={JSON.parse(initialResponse)}
    />
  </React.StrictMode>,
);
