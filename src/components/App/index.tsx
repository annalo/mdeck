import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { Home } from "components/Home/Loadable";
import { ThemeProvider } from "./ThemeProvider";
import { GlobalStyle } from "./GlobalStyle";

const ContextProviders = ({ children }) => (
  <MarkdownContextProvider>
    <SlideObserverProvider>
      <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
    </SlideObserverProvider>
  </MarkdownContextProvider>
);

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ContextProviders>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ContextProviders>
      </ThemeProvider>

      <GlobalStyle />
    </Router>
  );
};

export { App };
