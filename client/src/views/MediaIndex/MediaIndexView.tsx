import styled from "styled-components";
//import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/joy/Button";

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

// interface MediaIndexViewProps {
//   Medias: {
//     id: string;
//     title: string;
//     status: {
//       code: "draft" | "published";
//       display: string;
//     };
//     edit_url: string;
//   }[];
// }

export default function MediaIndexView(/* { Medias }: MediaIndexViewProps */) {
  return (
    <Layout
      title="Media"
      breadcrumb={[{ label: "Media" }]}
      renderHeaderButtons={() => (
        <Button
          color="primary"
          startDecorator={<AddPhotoAlternateIcon />}
          size="sm"
        >
          Add Image
        </Button>
      )}
    >
      <Header>
        <HeaderButtons></HeaderButtons>
      </Header>

      {/* <DataGrid rows={Medias} columns={columns} /> */}
    </Layout>
  );
}
