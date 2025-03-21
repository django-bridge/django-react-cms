import React from "react";
import styled from "styled-components";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from "@mui/joy/Button";

import Layout from "../components/Layout";
import { Link, NavigationContext } from "@django-bridge/react";
import ModalWindow from "../components/ModalWindow";

const MediaAssetListing = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  grid-gap: 20px;
  list-style: none;
  margin: 20px;

  li {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  figure {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  figcaption {
    margin-top: 10px;
  }
`;

interface MediaIndexViewProps {
  assets: {
    id: number;
    title: string;
    edit_url: string;
    thumbnail_url: string | null;
  }[];
  upload_url: string;
}

export default function MediaIndexView({ assets, upload_url }: MediaIndexViewProps) {
  const { openOverlay, refreshProps } = React.useContext(NavigationContext);

  return (
    <Layout
      title="Media"
      breadcrumb={[{ label: "" }]}
      renderHeaderButtons={() => (
        <Button
          color="primary"
          startDecorator={<FileUploadIcon />}
          size="sm"
          onClick={() =>
            openOverlay(
              upload_url,
              (content) => (
                <ModalWindow slideout="right">{content}</ModalWindow>
              ),
              {
                onClose: () => {
                  // Refresh props so new image pops up in listing
                  refreshProps();
                },
              }
            )
          }
        >
          Upload
        </Button>
      )}
    >
      <MediaAssetListing>
        {assets.map((asset) => (
          <li key={asset.id}>
            <Link href={asset.edit_url}>
              <figure>
                <img src={asset.thumbnail_url || "#"} alt={asset.title} />
                <figcaption>{asset.title}</figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </MediaAssetListing>
    </Layout>
  );
}
