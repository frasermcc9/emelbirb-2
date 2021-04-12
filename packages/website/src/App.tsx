import React from "react";
import Page from "./core/Page";
import "./styles/global.css";
import "./styles/tailwind.output.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Theme from "./core/Theme";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ServerSummary from "./pages/Dashboard/ServerSummary";
import { ApolloProvider } from "@apollo/client";
import GraphClient from "./graphql/apollo";

const App = () => {
  return (
    <Theme>
      <ApolloProvider client={GraphClient}>
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/dashboard" exact render={() => <Dashboard />} />
            <Route
              path="/dashboard/summary"
              exact
              render={() => <Dashboard location="summary" />}
            />
            <Route
              path="/dashboard/modules"
              exact
              render={() => <Dashboard location="modules" />}
            />
            <Route
              path="/dashboard/logs"
              exact
              render={() => <Dashboard location="logs" />}
            />
          </Switch>
        </Router>
      </ApolloProvider>
    </Theme>
  );
};

export default App;
