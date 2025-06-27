import { createTheme } from "@mui/material";

export const palleteV1 = createTheme({
  palette: {
    gray: {
      main: "#ababab",
    },
    white: {
      main: "#ececec",
    },
    pink: {
      main: "#ff66cc",
    },
    yellow: {
      main: "#ffd700",
    },
    primary: {
      light: "#E58E76",
      main: "#E07A5F",
      dark: "#D85531",
      contrastText: "#1B1B1B",
    },
    secondary: {
      light: "#52567A",
      main: "#3D405B",
      dark: "#313349",
      contrastText: "#F4F1DE",
    },
    error: {
      light: "#A30000",
      main: "#780000",
      dark: "#520000",
      contrastText: "#FAF9F0",
    },
    warning: {
      light: "#C4621C",
      main: "#A15017",
      dark: "#7D3E12",
      contrastText: "#FAF9F0",
    },
    info: {
      light: "#0092E0",
      main: "#0077B6",
      dark: "#005D8F",
      contrastText: "#FAF9F0",
    },
    success: {
      light: "#4C8844",
      main: "#31572C",
      dark: "#264422",
      contrastText: "#FAF9F0",
    },
    plain: {
      light: "#FFFFFF",
      main: "#F4F1DE",
      dark: "#EBE5C2",
      contrastText: "#1B1B1B",
    },
  },
});

export const breakpointsTw = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
      "3xl": 1920,
      "4xl": 2560,
    },
  },
});