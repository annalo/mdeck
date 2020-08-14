import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { Slideshow } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <Slideshow />
    </HelmetProvider>
  );

describe("<Slideshow />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
