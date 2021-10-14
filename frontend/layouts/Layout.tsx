import Header from "../components/Heaader/Header";
import { styled } from "@mui/material";

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
  margin: "10px",
}));
