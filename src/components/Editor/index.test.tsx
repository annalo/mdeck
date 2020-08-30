import React from "react";
import { render } from "@testing-library/react";
import { Editor } from ".";

describe("<Editor />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(<Editor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
