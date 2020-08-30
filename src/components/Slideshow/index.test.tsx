import React from "react";
import { render } from "@testing-library/react";
import { Slideshow } from ".";

describe("<Slideshow />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });
});
