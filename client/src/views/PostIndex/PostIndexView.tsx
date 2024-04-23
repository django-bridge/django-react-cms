import * as React from "react";
import styled from "styled-components";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/joy/Button";

import Layout from "../../components/Layout";
import { NavigationContext } from "@django-render/core";
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

// const columns: GridColDef[] = [
//   {
//     field: "title",
//     headerName: "Title",
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     valueGetter: (params: GridValueGetterParams) => params.row.status.display,
//   },
// ];

// interface PostIndexViewProps {
//   posts: {
//     id: string;
//     title: string;
//     status: {
//       code: "draft" | "published";
//       display: string;
//     };
//     edit_url: string;
//   }[];
// }

export default function PostIndexView(/* { posts }: PostIndexViewProps */) {
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

      {/* <DataGrid rows={posts} columns={columns} /> */}
    </Layout>
  );
}
