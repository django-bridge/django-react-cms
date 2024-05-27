import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link as DjangoRenderLink, OverlayContext } from "@django-render/core";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  title: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
  renderHeaderButtons?: () => React.ReactNode;
}

export default function Layout({
  title,
  breadcrumb = [],
  renderHeaderButtons,
  children,
}: React.PropsWithChildren<LayoutProps>) {
  const { overlay } = React.useContext(OverlayContext);

  if (overlay) {
    // The view is being rendered in an overlay, no need to render the menus or base CSS
    return (
      <>
      <Typography level="h2" component="h2">
        {title}
      </Typography>
      {renderHeaderButtons && renderHeaderButtons()}
      {children}
    </>
    );
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />}
              sx={{ pl: 0 }}
            >
              <Link
                component={DjangoRenderLink}
                underline="none"
                color="neutral"
                href={"/"}
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              {breadcrumb.map(({ label, href }) =>
                href ? (
                  <Link
                    component={DjangoRenderLink}
                    underline="hover"
                    color="neutral"
                    href={href}
                    fontSize={12}
                    fontWeight={500}
                    key={href}
                  >
                    {label}
                  </Link>
                ) : (
                  <Typography color="primary" fontWeight={500} fontSize={12}>
                    {label}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1" fontWeight="xl">
              {title}
            </Typography>
            {renderHeaderButtons && renderHeaderButtons()}
          </Box>
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
