"use client";

import React, { useContext } from "react";
import GridIcon from "@mui/icons-material/GridViewRounded";
import { DarkMode } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { styled } from "@mui/material/styles";
import { DarkModeContext } from "../clientLayout";
import { usePathname } from "next/navigation";
import IconButton from "./DarkModeButton";

// Temporary logo import or placeholder
import LogoIcon from '@mui/icons-material/EmojiEmotions'; // Example logo icon
import { Button } from "@mui/material";


export const navHeight = 65;

const NavBar: React.FC = () => {
  const path = usePathname();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        // borderBottom: `1px solid ${isDarkMode ? "#2c2c2c" : "#e0e0e0"}`,
        // backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)", // 50% transparency
        backgroundColor: isDarkMode ? "#0d0d0d" : "#F8F8FB",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between", // Align items on both ends
        // width: "100vw", // Take full width of viewport
        // padding: "0 20px", // Optional: control inner spacing
      }}
    >

      {/* Logo on the left side */}
      <Stack direction="row" alignItems="center">
        {/* Temporary logo */}
        <Button aria-label="Home page" href="/">
          <LogoIcon sx={{ fontSize: 40 }} />
        </Button>
      </Stack>

      {/* Buttons on the right side */}
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton active={isDarkMode} onClick={toggleDarkMode}>
          <DarkMode />
        </IconButton>
      </Stack>
    </AppBar>
  );
}

/**
 * Styled AppBar component that defines the main navigation bar's appearance.
 */
const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.background.default),
  boxShadow: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between", // Align items across the full width
  padding: theme.spacing(2, 2),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default NavBar;