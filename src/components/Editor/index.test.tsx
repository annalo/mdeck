import React from "react";
import { render } from "@testing-library/react";

import { Editor } from ".";

const renderComponent = () => render(<Editor />);

describe("<Editor />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
