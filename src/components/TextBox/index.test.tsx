import React from "react";
import { render } from "@testing-library/react";

import { TextBox } from ".";

const renderComponent = () =>
  render(<TextBox handleTextChange={() => {}} markdown="markdown text" />);

describe("<TextBox />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
