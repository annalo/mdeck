import React from "react";
import { render } from "@testing-library/react";

import { Slide } from ".";

const renderComponent = () => render(<Slide html="<h3>Heading 3</h3>" />);

describe("<Slide />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
