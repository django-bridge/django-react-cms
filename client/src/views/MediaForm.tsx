import * as React from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Form, OverlayContext } from "@django-render/core";
import FormDef from "../deserializers/Form";
import Layout from "../components/Layout";

interface MediaFormViewProps {
  title: string;
  submit_button_label: string;
  csrf_token: string;
  action_url: string;
  form: FormDef;
}

export default function MediaFormView({
  title,
  submit_button_label,
  csrf_token,
  action_url,
  form,
}: MediaFormViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);

  const renderedForm = (
    <Form action={action_url} method="post">
      <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

      {form.render()}
      <Button type="submit">{submit_button_label}</Button>
      {overlay && <Button type="button" variant="outlined" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
    </Form>
  );

  if (overlay) {
    return (
      <>
        <Typography level="h2" component="h1">
          {title}
        </Typography>

        {renderedForm}
      </>
    );
  }

  return (
    <Layout
      title={title}
      breadcrumb={[{ label: "Media" }, { label: title }]}
    >
      {renderedForm}
    </Layout>
  )
}
