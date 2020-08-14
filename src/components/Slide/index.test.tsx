import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { Slide } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <Slide />
    </HelmetProvider>
  );

describe("<Slide />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
