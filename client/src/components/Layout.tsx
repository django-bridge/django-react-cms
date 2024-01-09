import { Link } from "@djream/core";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  List,
  Container,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

import React from "react";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

const ListItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const defaultTheme = createTheme();

export default function Layout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", flexFlow: "column", height: "100vh" }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Djreampress
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexFlow: "row", height: "100%" }}>
          <Drawer variant="permanent" open={open}>
            <List component="nav" sx={{ flexGrow: 1 }}>
              <ListItemLink href="/">
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItemLink>
              <ListItemLink href="/posts/">
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItemButton>
              </ListItemLink>
            </List>
            <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon sx={{ ...(!open && { display: "none" }) }} />
                <ChevronRightIcon sx={{ ...(open && { display: "none" }) }} />
              </IconButton>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
