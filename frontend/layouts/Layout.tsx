import { styled } from "@mui/material";
import React from "react";
import Header from "../components/Heaader/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <>
      {/* <Sidebar /> */}
      <Header />
      <Body>{children}</Body>
    </>
  );
}

const Body = styled("div")(({ theme }) => ({
  margin: "10px"
}));
