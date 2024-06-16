import * as React from "react";
import Button from "@mui/joy/Button";
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

  const title = post ? `Editing ${post.title}` : "Add Post";

  return (
    <Layout
      title={title}
      breadcrumb={[{ label: "Posts", href: urls.posts_index }, { label: title }]}
    >
      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}
        <Button type="submit">{post ? 'Save changes' : 'Add Post'}</Button>
        {overlay && <Button type="button" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
      </Form>
    </Layout>
  )
}
