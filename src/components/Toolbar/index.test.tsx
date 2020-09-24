import React from "react";
import { render } from "utils/test-utils";
import { Toolbar } from ".";

describe("<Toolbar />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Toolbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
