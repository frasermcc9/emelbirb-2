import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#F55D3E" },
    secondary: { main: "#5299D3" },
    warning: { main: "#8332Ac" },
  },
});

const Theme: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
