import Box from "@mui/material/Box";
import { StyledEngineProvider, SxProps, Theme, ThemeProvider } from "@mui/material/styles";
import appTheme from "../common/theme/theme";
import Loader from "../common/useLoader/Loader";
import SnackbarMessageProvider from "../common/useSnackbar/Snackbar";
import Header from "../components/Heaader/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
  mainContentStyle?: SxProps<Theme>;
}

export const smallerPageContentWrapper: SxProps<Theme> = {
  p: (theme) => theme.spacing(3),
  m: (theme) => `${theme.spacing(2)} ${theme.spacing(20)}`,
  // borderRadius: 8,
  // TODO: Change the color
  // border: (theme) => `1px solid ${theme.palette.primary.veryLight}`,
  boxShadow: (theme) => `5px 5px 5px ${theme.palette.primary.veryLight}`
};

export default function Layout({ children, mainContentStyle }: Props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <Loader>
          <SnackbarMessageProvider>
            <Header />
            <Box
              sx={[
                { p: 1 },
                ...(mainContentStyle ? (Array.isArray(mainContentStyle) ? mainContentStyle : [mainContentStyle]) : [])
              ]}
            >
              {children}
            </Box>
          </SnackbarMessageProvider>
        </Loader>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
