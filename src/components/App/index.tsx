import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "components/Home/Loadable";
import { GlobalStyle } from "./GlobalStyle";

export const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <GlobalStyle />
    </Router>
  );
};
