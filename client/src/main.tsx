import React from "react";
import ReactDOM from "react-dom/client";
import * as Meze from "@meze/core";
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
const mezeConfig = new Meze.Config();
mezeConfig.addView("Home", HomeView);
mezeConfig.addView("PostIndex", PostIndexView);
mezeConfig.addView("PostForm", PostFormView);
mezeConfig.addView("MediaIndex", MediaIndexView);

// Add your deserializers here
mezeConfig.addDeserializer("forms.Form", FormDef);
mezeConfig.addDeserializer("forms.Field", FieldDef);
mezeConfig.addDeserializer(
  "forms.ServerRenderedInput",
  ServerRenderedInputtDef,
);
mezeConfig.addDeserializer("forms.TextInput", TextInputDef);
mezeConfig.addDeserializer("forms.Select", SelectDef);
mezeConfig.addDeserializer("Date", Date);

const rootElement = document.getElementById("root")!;
const initialResponse = rootElement.dataset.initialResponse!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Meze.App
      config={mezeConfig}
      initialResponse={JSON.parse(initialResponse)}
    />
  </React.StrictMode>,
);
