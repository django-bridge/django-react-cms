import * as React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/joy/Button";

import Layout from "../components/Layout";
import { Link, NavigationContext } from "@django-render/core";
import ModalWindow from "../components/ModalWindow";

interface Post {
  title: string;
  edit_url: string;
}

interface PostIndexViewProps {
  posts: Post[];
}

export default function PostIndexView({ posts }: PostIndexViewProps) {
  const { openOverlay, refreshProps } = React.useContext(NavigationContext);

  return (
    <Layout
      title="Posts"
      breadcrumb={[{ label: "Posts" }]}
      renderHeaderButtons={() => (
        <Button
          color="primary"
          startDecorator={<PostAddIcon />}
          size="sm"
          onClick={() =>
            openOverlay("/posts/add/", (content) => (
              <ModalWindow side="right">
                {content}
              </ModalWindow>
            ), {
              onClose: () => {
                // Refresh props so new post pops up in listing
                refreshProps();
              }
            })
          }
        >
          Add Post
        </Button>
      )}
    >
      <table>
        <thead>
          <th>
            Title
          </th>
          <th>
            Actions
          </th>
        </thead>
        <tbody>
          {posts.map(post => <tr><td>{post.title}</td><td><Link href={post.edit_url}>Edit</Link></td></tr>)}
        </tbody>
      </table>

      {/* <DataGrid rows={posts} columns={columns} /> */}
    </Layout>
  );
}
