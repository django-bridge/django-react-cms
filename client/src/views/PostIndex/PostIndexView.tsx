import styled from "styled-components";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import Layout from "../../components/Layout";

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

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
  },
  {
    field: "status",
    headerName: "Status",
    valueGetter: (params: GridValueGetterParams) => params.row.status.display,
  },
];

interface PostIndexViewProps {
  posts: {
    id: string;
    title: string;
    status: {
      code: "draft" | "published";
      display: string;
    };
    edit_url: string;
  }[];
}

export default function PostIndexView({ posts }: PostIndexViewProps) {
  return (
    <Layout>
      <Header>
        <h1>Posts</h1>
        <HeaderButtons>
          <Button variant="contained" href="/posts/add/">
            Add Post
          </Button>
        </HeaderButtons>
      </Header>

      <DataGrid rows={posts} columns={columns} />
    </Layout>
  );
}
