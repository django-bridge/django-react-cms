import * as React from "react";
import Button from "@mui/joy/Button";
import { Form, OverlayContext } from "@django-render/core";
import FormDef from "../deserializers/Form";
import Layout from "../components/Layout";
import { CSRFTokenContext, URLsContext } from "../contexts";

interface MediaFormViewProps {
  title: string;
  submit_button_label: string;
  action_url: string;
  form: FormDef;
}

export default function MediaFormView({
  title,
  submit_button_label,
  action_url,
  form,
}: MediaFormViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title={title}
      breadcrumb={[{ label: "Media", href: urls.media_index }, { label: title }]}
    >
      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}
        <Button type="submit">{submit_button_label}</Button>
        {overlay && <Button type="button" variant="outlined" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
      </Form>
    </Layout>
  )
}
