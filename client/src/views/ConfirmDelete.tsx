import * as React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { Form, OverlayContext } from "@django-render/core";

import Layout from "../components/Layout";
import { CSRFTokenContext } from "../contexts";

interface ConfirmDeleteViewContext {
  objectName: string;
  messageHtml?: string;
  actionUrl: string;
}

function ConfirmDeleteView({
  objectName,
  messageHtml,
  actionUrl,
}: ConfirmDeleteViewContext) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrfToken = React.useContext(CSRFTokenContext);

  return (
    <Layout
      title={`Deleting ${objectName}`}
    >
      {messageHtml && <Box sx={{marginTop: "1rem"}} dangerouslySetInnerHTML={{ __html: messageHtml }} />}

      <Form action={actionUrl} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <Button type="submit">Delete</Button>
        {overlay && <Button type="button" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
      </Form>
    </Layout>
  );
}
export default ConfirmDeleteView;
