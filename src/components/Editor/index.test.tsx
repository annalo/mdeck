import React from "react";
import { render } from "test-utils";
import { Editor } from ".";

describe("<Editor />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Editor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
