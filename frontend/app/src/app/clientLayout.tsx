"use client";

import { blue, grey, } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, styled } from "@mui/material/styles";
import ThemeProvider from "@mui/system/ThemeProvider";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import NavBar, { navHeight } from "./components/NavBar";
import store from "./redux/store";

/**
 * This context provides the current dark mode setting and a toggle function to switch between light and dark modes.
 */
export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

import { GlobalStyles } from '@mui/material';

const GlobalTextStyles = () => (
  <GlobalStyles styles={(theme) => ({
    body: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
  })} />
);

/**
 * ClientLayout Component
 * 
 * This component wraps all global providers, including ThemeProvider and ReduxProvider, and sets up the basic
 * layout for the application. It handles the dark mode logic and provides the context for the dark mode toggle.
 *
 * @component
 * @param {Object} props - Properties passed to the ClientLayout component.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 *
 * @returns {JSX.Element} The main layout with theme and global providers.
 */
const ClientLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMode((localStorage.getItem("darkMode") as any) || "light");
  }, []);

  const toggle = useMemo(
    () => ({
      isDarkMode: mode === "dark",
      toggleDarkMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
        localStorage.setItem("darkMode", mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
  );

  const theme = useMemo(() => {
    const lightPalette = {
      primary: {
        main: "#7B61FF", // Purple
      },
      secondary: {
        main: "#1A1A1A",
      },
      background: {
        default: "#F4F4F9", // Light purple tone grey
        paper: "#F8F8FB", 
      },
      text: {
        primary: "#2D2D34",
        secondary: "#4F4F57",
      },
    };

    const darkPalette = {
      primary: {
        main: "#9A86FF", // Purple
      },
      secondary: {
        main: "#F8F8FB",
      },
      background: {
        default: "#1A1A1A",
        paper: "#F8F8FB",
      },
      text: {
        primary: "#2D2D34",
        secondary: "#4F4F57",
      },
    };

    return createTheme({
      palette: mode === "light" ? lightPalette : darkPalette,
    });
  }, [mode]);

  return (
    <DarkModeContext.Provider value={toggle}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalTextStyles />
        <ReduxProvider store={store}>
          <App>{children}</App>
        </ReduxProvider>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

/**
 * App Component
 * 
 * This component wraps the children with the main application layout. It includes the NavBar and Main container
 * for displaying content.
 *
 * @component
 * @param {Object} props - Properties passed to the App component.
 * @param {React.ReactNode} props.children - The content to be rendered within the App component.
 *
 * @returns {JSX.Element} The application layout with navigation and main content.
 */
const App: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Main>{children}</Main>
    </>
  );
};

/**
 * A styled "main" component that serves as the main content area of the application. It includes a transition for
 * margin and width changes and sets the padding to accommodate the navigation bar height.
 */
const Main = styled("main")(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  paddingTop: navHeight,
  width: "100%",
  marginRight: 0,
  height: "100%",
}));

export default ClientLayout;