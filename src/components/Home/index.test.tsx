import React from "react";
import { render } from "@testing-library/react";
import { Home } from ".";

describe("<Home />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
