import appTheme from "../common/theme/theme";
import Loader from "../common/useLoader/Loader";
import Header from "../components/Heaader/Header";
import { styled, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <Loader>
          {/* <Sidebar /> */}
          <Header />
          <Box sx={{ p: 1 }}>{children}</Box>
        </Loader>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
