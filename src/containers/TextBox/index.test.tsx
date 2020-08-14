import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { TextBox } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <TextBox handleTextChange={() => {}} markdown="markdown text" />
    </HelmetProvider>
  );

describe("<TextBox />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
