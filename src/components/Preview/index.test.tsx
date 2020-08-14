import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { Preview } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <Preview html="<h3>Heading 3</h3>" />
    </HelmetProvider>
  );

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
