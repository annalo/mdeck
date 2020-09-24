import React from "react";
import { render } from "utils/test-utils";
import { App } from "./index";

describe("<App />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
