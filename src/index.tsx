/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from "serviceWorker";
import "sanitize.css/sanitize.css";

// Import root app
import { App } from "containers/App";

import { HelmetProvider } from "react-helmet-async";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <HelmetProvider>
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  </HelmetProvider>
);
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const AppContainer = require("./containers/App").App; // eslint-disable-line
    render(AppContainer);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
