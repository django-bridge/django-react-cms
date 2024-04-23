import React from "react";
import ReactDOM from "react-dom/client";
import * as DjangoRender from "@django-render/core";
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
const djangorenderConfig = new DjangoRender.Config();
djangorenderConfig.addView("Home", HomeView);
djangorenderConfig.addView("PostIndex", PostIndexView);
djangorenderConfig.addView("PostForm", PostFormView);
djangorenderConfig.addView("MediaIndex", MediaIndexView);

// Add your deserializers here
djangorenderConfig.addDeserializer("forms.Form", FormDef);
djangorenderConfig.addDeserializer("forms.Field", FieldDef);
djangorenderConfig.addDeserializer(
  "forms.ServerRenderedInput",
  ServerRenderedInputtDef
);
djangorenderConfig.addDeserializer("forms.TextInput", TextInputDef);
djangorenderConfig.addDeserializer("forms.Select", SelectDef);
djangorenderConfig.addDeserializer("Date", Date);

const rootElement = document.getElementById("root")!;
const initialResponse = rootElement.dataset.initialResponse!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DjangoRender.App
      config={djangorenderConfig}
      initialResponse={JSON.parse(initialResponse)}
    />
  </React.StrictMode>
);
