import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Form, OverlayContext } from "@django-bridge/react";
import FormDef from "../deserializers/Form";
import Layout from "../components/Layout";
import { CSRFTokenContext, URLsContext } from "../contexts";

interface FileDetailViewProps {
  title: string;
}

export default function FileDetailView({
  title,
}: FileDetailViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title={title}
      breadcrumb={[{ label: "Media", href: urls.files_index }, { label: "" }]}
    >
    </Layout>
  );
}
