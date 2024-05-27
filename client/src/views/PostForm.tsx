import * as React from "react";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Form, OverlayContext } from "@django-render/core";
import FormDef from "../deserializers/Form";
import { Post } from "../types";
import Layout from "../components/Layout";

interface PostFormViewProps {
  post: Post | null;
  csrf_token: string;
  action_url: string;
  form: FormDef;
}

export default function PostFormView({
  post,
  csrf_token,
  action_url,
  form,
}: PostFormViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);

  const title = post ? `Editing ${post.title}` : "Add Post";

  const renderedForm = (
    <Form action={action_url} method="post">
      <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

      {form.render()}
      <Button type="submit">{post ? 'Save changes' : 'Add Post'}</Button>
      {overlay && <Button type="button" onClick={() => requestClose({skipDirtyFormCheck: true})}>Cancel</Button>}
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
      breadcrumb={[{ label: "Posts" }, { label: title }]}
    >
      {renderedForm}
    </Layout>
  )
}
