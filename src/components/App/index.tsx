import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "components/Home/Loadable";
import { ThemeProvider } from "./ThemeProvider";
import { GlobalStyle } from "./GlobalStyle";

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>

      <GlobalStyle />
    </Router>
  );
};

export { App };
