import React from "react";
import { render } from "@testing-library/react";

import { SlideElement } from ".";

const renderComponent = () =>
  render(
    <SlideElement
      contentAttributes={{ key: "value" }}
      elementTag="h1"
      lineNumber={0}
    >
      Title
    </SlideElement>
  );

describe("<SlideElement />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
