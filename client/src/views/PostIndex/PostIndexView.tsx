import * as React from "react";
import styled from "styled-components";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/joy/Button";

import Layout from "../../components/Layout";
import { Link, NavigationContext } from "@django-render/core";
import ModalWindow from "../../components/ModalWindow";

const Header = styled.header`
  padding: 20px;
  display: flex;
  flex-flow: right;

  h1 {
    font-weight: 700;
    font-size: 1.5em;
  }
`;

const HeaderButtons = styled.div`
  margin-left: auto;
`;

interface Post {
  title: string;
  edit_url: string;
}

interface PostIndexViewProps {
  posts: Post[];
}

export default function PostIndexView({ posts }: PostIndexViewProps) {
  const { openOverlay } = React.useContext(NavigationContext);

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
            openOverlay("/posts/add/", (content, onClose, requestClose) => (
              <ModalWindow
                side="right"
                onClose={onClose}
                requestClose={requestClose}
              >
                {content}
              </ModalWindow>
            ))
          }
        >
          Add Post
        </Button>
      )}
    >
      <Header>
        <HeaderButtons></HeaderButtons>
      </Header>

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
