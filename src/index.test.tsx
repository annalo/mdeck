import ReactDOM from "react-dom";

import { App } from "components/App";
import { render } from "./index";

jest.mock("react-dom", () => ({
  render: jest.fn(),
}));

describe("render", () => {
  test("should render App without crashing", () => {
    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("id", "root");

    render(App);
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
