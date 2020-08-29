import * as React from "react";
import * as ReactDOM from "react-dom";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

const App = () => <div>Hello</div>;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

render(App);
