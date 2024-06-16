import React from "react";
import ReactDOM from "react-dom/client";
import * as DjangoRender from "@django-render/core";

import HomeView from "./views/Home";
import PostIndexView from "./views/PostIndex";
import MediaIndexView from "./views/MediaIndex";
import PostFormView from "./views/PostForm";
import MediaFormView from "./views/MediaForm";
import FormDef from "./deserializers/Form";
import FieldDef from "./deserializers/Field";
import ServerRenderedFieldDef from "./deserializers/ServerRenderedField";
import TextInputDef from "./deserializers/widgets/TextInput";
import SelectDef from "./deserializers/widgets/Select";
import FileInputDef from "./deserializers/widgets/FileInput";
import BlockNoteEditorDef from "./deserializers/widgets/BlockNoteEditor";

import "./main.css";
import { CSRFTokenContext, URLsContext } from "./contexts";

const config = new DjangoRender.Config();

// Add your views here
config.addView("Home", HomeView);
config.addView("PostIndex", PostIndexView);
config.addView("PostForm", PostFormView);
config.addView("MediaIndex", MediaIndexView);
config.addView("MediaForm", MediaFormView);

// Add your context providers here
config.addContextProvider("csrf_token", CSRFTokenContext);
config.addContextProvider("urls", URLsContext);

// Add your deserializers here
config.addDeserializer("forms.Form", FormDef);
config.addDeserializer("forms.Field", FieldDef);
config.addDeserializer(
  "forms.ServerRenderedField",
  ServerRenderedFieldDef
);
config.addDeserializer("forms.TextInput", TextInputDef);
config.addDeserializer("forms.Select", SelectDef);
config.addDeserializer("forms.FileInput", FileInputDef);
config.addDeserializer("forms.BlockNoteEditor", BlockNoteEditorDef);

const rootElement = document.getElementById("root")!;
const initialResponse = JSON.parse(
  document.getElementById("initial-response")!.textContent!
);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DjangoRender.App config={config} initialResponse={initialResponse} />
  </React.StrictMode>
);
