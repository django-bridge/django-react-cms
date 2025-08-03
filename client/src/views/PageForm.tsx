import * as React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { Form, OverlayContext } from "@django-bridge/react";
import FormDef from "../deserializers/Form";
import { Page } from "../types";
import Layout from "../components/Layout";
import { CSRFTokenContext, URLsContext } from "../contexts";

interface PageFormViewProps {
  page: Page | null;
  action_url: string;
  form: FormDef;
}

export default function PageFormView({
  page,
  action_url,
  form,
}: PageFormViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title={page ? "Edit Page" : "Add Page"}
      breadcrumb={[{ label: "Pages", href: urls.pages_index }, { label: "" }]}
    >
      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}

        <Box display="flex" gap="12px" pt="20px">
          <Button type="submit">{page ? "Save changes" : "Add Page"}</Button>
          {overlay && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => requestClose({ skipDirtyFormCheck: true })}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Form>
    </Layout>
  );
}
