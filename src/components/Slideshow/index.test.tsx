import React from "react";
import { render } from "@testing-library/react";

import { Slideshow } from ".";

const renderComponent = () => render(<Slideshow />);

describe("<Slideshow />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
