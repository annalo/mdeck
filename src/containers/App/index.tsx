/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { HomePage } from "containers/HomePage/Loadable";
import { NotFoundPage } from "containers/NotFoundPage/Loadable";

import { GlobalStyle } from "./GlobalStyle";

export default function App() {
  return (
    <BrowserRouter>
      <Helmet defaultTitle="mdeck" titleTemplate="%s - mdeck">
        <meta
          content="A minimal, markdown-based presentation tool."
          name="description"
        />
      </Helmet>

      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
