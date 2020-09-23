import React from "react";
import { render } from "@testing-library/react";
import { LoadFileMenuItem } from ".";

describe("<LoadFileMenuItem />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<LoadFileMenuItem />);
    expect(asFragment()).toMatchSnapshot();
  });
});
