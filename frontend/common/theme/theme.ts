import { createTheme, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    veryLight: string;
  }
  interface PaletteOptions {
    secondary2: PaletteColorOptions;
  }

  interface PaletteColor {
    veryLight: string;
  }

  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1C3BFF",
      light: "#5E74FF",
      dark: "#0017AA",
      veryLight: "#B8C2FF"
    },
    secondary: {
      main: "#B50AFF",
      dark: "#7300A5",
      light: "#C94FFF",
      veryLight: "#E8B1FF"
    },
    secondary2: {
      main: "#00FF92",
      dark: "#00AA61",
      light: "#46FFB0",
      veryLight: "#AEFFDC"
    }
  }
});

export default customTheme;
