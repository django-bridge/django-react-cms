import React from "react";
import ReactDOM from "react-dom/client";
import * as Djream from "@djream/core";
import "./index.css";

import HomeView from "./views/Home";
import PostIndexView from "./views/PostIndex";
import MediaIndexView from "./views/MediaIndex";
import PostFormView from "./views/PostForm";
import FormDef from "./deserializers/Form";
import FieldDef from "./deserializers/Field";
import ServerRenderedInputtDef from "./deserializers/widgets/ServerRenderedInput";
import TextInputDef from "./deserializers/widgets/TextInput";
import SelectDef from "./deserializers/widgets/Select";

// Add your views here
const djreamConfig = new Djream.Config();
djreamConfig.addView("Home", HomeView);
djreamConfig.addView("PostIndex", PostIndexView);
djreamConfig.addView("PostForm", PostFormView);
djreamConfig.addView("MediaIndex", MediaIndexView);

// Add your deserializers here
djreamConfig.addDeserializer("forms.Form", FormDef);
djreamConfig.addDeserializer("forms.Field", FieldDef);
djreamConfig.addDeserializer(
  "forms.ServerRenderedInput",
  ServerRenderedInputtDef,
);
djreamConfig.addDeserializer("forms.TextInput", TextInputDef);
djreamConfig.addDeserializer("forms.Select", SelectDef);
djreamConfig.addDeserializer("Date", Date);

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
