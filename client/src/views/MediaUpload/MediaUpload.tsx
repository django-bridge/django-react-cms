import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Form, OverlayContext } from "@django-bridge/react";
import FormDef from "../../deserializers/Form";
import Layout from "../../components/Layout";
import { CSRFTokenContext, URLsContext } from "../../contexts";

interface MediaUploadViewProps {
  action_url: string;
  form: FormDef;
}

export default function MediaUploadView({
  action_url,
  form,
}: MediaUploadViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title="Upload"
      breadcrumb={[{ label: "Media", href: urls.media_index }, { label: "" }]}
    >
      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}

        <Box display="flex" gap="12px" pt="20px">
          <Button type="submit">Upload</Button>
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
