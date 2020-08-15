import React from "react";
import { render } from "@testing-library/react";

import { Slide } from ".";

const renderComponent = () => render(<Slide content="### Heading 3" />);

describe("<Slide />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
