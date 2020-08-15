import React from "react";
import { render } from "@testing-library/react";

import { Preview } from ".";

const renderComponent = () =>
  render(<Preview html="<h1>Title</h1><br/><h3>Heading 3</h3>" />);

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
