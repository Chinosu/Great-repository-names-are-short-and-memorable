"use client";

import React, { useContext } from "react";
import HomeIcon from '@mui/icons-material/Home';
import GridIcon from "@mui/icons-material/GridViewRounded";
import { DarkMode } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { styled } from "@mui/material/styles";
import { DarkModeContext } from "../clientLayout";
import { usePathname } from "next/navigation";

import IconButton from "./IconButton";

export const navHeight = 65;

const NavBar: React.FC = () => {
  const path = usePathname();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: `1px solid ${isDarkMode ? "#2c2c2c" : "#e0e0e0"}`,
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >

      <Stack direction="row" spacing={1}>
        {/* Some buttons here */}
        <IconButton
          aria-label="Home page"
          active={path === "/"}
          href="/"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          aria-label="Browse events"
          active={path === "/browse"}
          href="/browse"
        >
          <GridIcon />
        </IconButton>
        {/* <IconButton active={isDarkMode} onClick={toggleDarkMode}>
          <DarkMode />
        </IconButton> */}
      </Stack>

    </AppBar>
  );
}

/**
 * Styled AppBar component that defines the main navigation bar's appearance.
 */
const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  boxShadow: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0.5, 2),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default NavBar;