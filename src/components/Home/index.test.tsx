import React from "react";
import { render } from "utils/test-utils";
import { Home } from ".";

describe("<Home />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
