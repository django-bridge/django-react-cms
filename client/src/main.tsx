import React from "react";
import ReactDOM from "react-dom/client";
import * as DjangoBridge from "@django-bridge/react";

import LoginView from "./views/Login";
import HomeView from "./views/Home";
import ConfirmDeleteView from "./views/ConfirmDelete";
import PostIndexView from "./views/PostIndex";
import FilesIndexView from "./views/FilesIndex";
import PostFormView from "./views/PostForm";
import MediaFormView from "./views/MediaForm";

import FormDef from "./deserializers/Form";
import FieldDef from "./deserializers/Field";
import ServerRenderedFieldDef from "./deserializers/ServerRenderedField";
import TextInputDef from "./deserializers/widgets/TextInput";
import SelectDef from "./deserializers/widgets/Select";
import FileInputDef from "./deserializers/widgets/FileInput";
import BlockNoteEditorDef from "./deserializers/widgets/BlockNoteEditor";
import { CSRFTokenContext, URLsContext } from "./contexts";

const config = new DjangoBridge.Config();

// Add your views here
config.addView("Login", LoginView);
config.addView("Home", HomeView);
config.addView("ConfirmDelete", ConfirmDeleteView);
config.addView("PostIndex", PostIndexView);
config.addView("PostForm", PostFormView);
config.addView("FilesIndex", FilesIndexView);
config.addView("MediaForm", MediaFormView);

// Add your context providers here
config.addContextProvider("csrf_token", CSRFTokenContext);
config.addContextProvider("urls", URLsContext);

// Add your deserializers here
config.addAdapter("forms.Form", FormDef);
config.addAdapter("forms.Field", FieldDef);
config.addAdapter("forms.ServerRenderedField", ServerRenderedFieldDef);
config.addAdapter("forms.TextInput", TextInputDef);
config.addAdapter("forms.Select", SelectDef);
config.addAdapter("forms.FileInput", FileInputDef);
config.addAdapter("forms.BlockNoteEditor", BlockNoteEditorDef);

const rootElement = document.getElementById("root")!;
const initialResponse = JSON.parse(
  document.getElementById("initial-response")!.textContent!
);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DjangoBridge.App config={config} initialResponse={initialResponse} />
  </React.StrictMode>
);
