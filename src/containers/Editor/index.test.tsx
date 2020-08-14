import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { Editor } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <Editor />
    </HelmetProvider>
  );

describe("<Editor />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
