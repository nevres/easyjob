import { styled } from "@mui/material";
import React from "react";
import Loader from "../common/useLoader/Loader";
import Header from "../components/Heaader/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <Loader>
      {/* <Sidebar /> */}
      <Header />
      <Body>{children}</Body>
    </Loader>
  );
}

const Body = styled("div")(({ theme }) => ({
  margin: "10px"
}));
