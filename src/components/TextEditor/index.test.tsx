import React from "react";
import { render } from "@testing-library/react";

import { TextEditor } from ".";

const renderComponent = () =>
  render(<TextEditor handleTextChange={() => {}} markdown="markdown text" />);

describe("<TextEditor />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
