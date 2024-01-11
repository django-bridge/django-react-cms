import { Button, Typography } from "@mui/joy";
import Form from "../../components/Form";
import FormDef from "../../deserializers/Form";

interface PostFormViewProps {
  csrf_token: string;
  action_url: string;
  form: FormDef;
}

export default function PostFormView({
  csrf_token,
  action_url,
  form,
}: PostFormViewProps) {
  return (
    <>
      <Typography level="h2" component="h1">
        Add Post
      </Typography>

      <Form action={action_url} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />

        {form.render()}
        <Button type="submit">Add post</Button>
      </Form>
    </>
  );
}
