import React from "react";
import { render } from "@testing-library/react";

import { Preview } from ".";

const renderComponent = () => render(<Preview />);

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
