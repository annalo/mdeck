import * as React from "react";
import * as ReactDOM from "react-dom";
import "sanitize.css/sanitize.css";

import { App } from "components/App";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
const render = (Component: typeof App): void => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) module.hot.accept(["./components/App"], () => render(App));

render(App);

export { render };
