import "../src/styles/tailwind.output.css";
import "../src/styles/global.css";
import { muiTheme } from "storybook-addon-material-ui";
import GuildContext, { SERVER_EXAMPLE } from "../src/hooks/useGuildContext";
import { MemoryRouter as Router } from "react-router-dom";

// import { theme } from "../src/core/Theme";

const theme = {
  themeName: "Base theme",
  palette: {
    type: "dark",
    primary: { main: "#F55D3E" },
    secondary: { main: "#5299D3" },
    warning: { main: "#8332Ac" },
  },
};

const guild = SERVER_EXAMPLE;

export const decorators = [
  muiTheme([theme]),
  (Stories) => (
    <GuildContext.Provider value={guild}>
      <Router>
        <Stories />
      </Router>
    </GuildContext.Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
