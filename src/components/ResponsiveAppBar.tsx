import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FormatListNumberedRtlOutlinedIcon from "@mui/icons-material/FormatListNumberedRtlOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FormControl,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import React, { useState } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const menuItems = [
  {
    text: "Home",
    icon: <HomeIcon color="secondary" />,
    path: "/",
  },
  {
    text: "CreateCollection",
    icon: <AddIcon color="secondary" />,
    path: "/create-collection",
  },
  {
    text: "Collection",
    icon: <ShoppingBagOutlinedIcon color="secondary" />,
    path: "/collections",
  },
  {
    text: "Decks",
    icon: <AddIcon color="secondary" />,
    path: "/decks",
  },
  {
    text: "Wallet",
    icon: <SavingsIcon color="secondary" />,
    path: "/wallet",
  },
  {
    text: "Lists",
    icon: <FormatListNumberedRtlOutlinedIcon color="secondary" />,
    path: "/lists",
  },
  {
    text: "Rankings",
    icon: <MoreHorizOutlinedIcon color="secondary" />,
    path: "/rankings",
  },
];
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setAnchorElNav(event?.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //  const handleBackgroundChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   const value = event.target.value as string;
  //   if (value.startsWith("BackgroundImages/")) {
  //     setBackgroundImage(value);
  //     setBackgroundColor("");
  //   } else {
  //     setBackgroundColor(value);
  //     setBackgroundImage("");
  //   }
  // };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* ---------------------------------------------------------(NavBar-Text)----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              textAlign: "justify",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Kokoelmani
          </Typography>
          {/* ---------------------------------------------------------(NavBar-Dropdown)----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems.map((item) => (
                <Link href={String(item.path).toLowerCase()} key={item.text}>
                  <ListItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* ---------------------------------------------------------(NavBar-Dropdown-Text)----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Kokoelmaniii
          </Typography>
          {/* ----------------------------------------------------------(NavBar)---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {menuItems.map((item) => (
              <Link href={String(item.path).toLowerCase()} key={item.text}>
                <ListItem
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 1,
                    gridTemplateRows: "auto",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </Box>
          {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
