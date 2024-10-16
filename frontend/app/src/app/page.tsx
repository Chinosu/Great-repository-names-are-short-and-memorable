"use client";

import Container from "postcss/lib/container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";

import Landing from "./components/Landing";

const Home = () => {
  return (
    <Main>
      <Landing />
    </Main>
  );
};

const Main = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(12, 0),
}));

export default Home;
