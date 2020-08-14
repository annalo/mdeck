import React from "react";
import { render } from "@testing-library/react";

import { Preview } from ".";

const renderComponent = () =>
  render(<Preview slides={["# Title", "### Heading 3"]} />);

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
