import React from "react";
import { render } from "@testing-library/react";

import { SlideElement } from ".";

const renderComponent = () =>
  render(
    <SlideElement attributes={{}} elementTag="h1" lineNumber={2}>
      <div>Some Child Element</div>
    </SlideElement>
  );

describe("<SlideElement />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
