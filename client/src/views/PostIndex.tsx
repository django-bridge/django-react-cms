import * as React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Table from "@mui/joy/Table";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Delete from "@mui/icons-material/Delete";
import Link from "@mui/joy/Link";

import Layout from "../components/Layout";
import {
  Link as DjangoBridgeLink,
  NavigationContext,
} from "@django-bridge/react";
import ModalWindow from "../components/ModalWindow";

interface Post {
  title: string;
  edit_url: string;
  delete_url: string;
}

interface PostIndexViewProps {
  posts: Post[];
}

export default function PostIndexView({ posts }: PostIndexViewProps) {
  const { openOverlay, refreshProps } = React.useContext(NavigationContext);

  return (
    <Layout
      title="Posts"
      breadcrumb={[{ label: "" }]}
      renderHeaderButtons={() => (
        <Button
          color="primary"
          startDecorator={<PostAddIcon />}
          size="sm"
          onClick={() =>
            openOverlay(
              "/posts/add/",
              (content) => <ModalWindow>{content}</ModalWindow>,
              {
                onClose: () => {
                  // Refresh props so new post pops up in listing
                  refreshProps();
                },
              }
            )
          }
        >
          Add Post
        </Button>
      )}
      fullWidth
    >
      <Table
        sx={{
          "& tr > td:first-child": { paddingLeft: { xs: 2, md: 6 } },
          "& tr > th:first-child": { paddingLeft: { xs: 2, md: 6 } },
          "& tr > td:last-child": { paddingRight: { xs: 2, md: 6 } },
          "& tr > th:last-child": { paddingRight: { xs: 2, md: 6 } },
        }}
      >
        <thead>
          <tr>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>
                <Link
                  component={DjangoBridgeLink}
                  level="h4"
                  href={post.edit_url}
                >
                  {post.title}
                </Link>
                <ButtonGroup
                  size="sm"
                  variant="plain"
                  spacing="0.5rem"
                  sx={{ marginTop: "0.5rem" }}
                >
                  <Link component={DjangoBridgeLink} href={post.edit_url}>
                    Edit
                  </Link>
                  <IconButton
                    onClick={() =>
                      openOverlay(
                        post.delete_url,
                        (content) => (
                          <ModalWindow slideout="right">{content}</ModalWindow>
                        ),
                        {
                          onClose: () => {
                            // Refresh props so new post pops up in listing
                            refreshProps();
                          },
                        }
                      )
                    }
                  >
                    <Delete />
                  </IconButton>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <DataGrid rows={posts} columns={columns} /> */}
    </Layout>
  );
}
