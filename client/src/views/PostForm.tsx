import * as React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { Form, OverlayContext } from "@django-render/core";
import FormDef from "../deserializers/Form";
import { Post } from "../types";
import Layout from "../components/Layout";
import { CSRFTokenContext, URLsContext } from "../contexts";

interface PostFormViewProps {
  post: Post | null;
  action_url: string;
  form: FormDef;
}

export default function PostFormView({
  post,
  action_url,
  form,
}: PostFormViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title={post ? post.title: "Add Post"}
      breadcrumb={[{ label: "Posts", href: urls.posts_index }, { label: "" }]}
    >
      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}

        <Box display="flex" gap="12px" pt="20px">
          <Button type="submit">{post ? 'Save changes' : 'Add Post'}</Button>
          {overlay && <Button type="button" variant="outlined" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
        </Box>
      </Form>
    </Layout>
  )
}
