import React from "react";
import { render } from "@testing-library/react";

import { Slide } from ".";

const renderComponent = () =>
  render(
    <Slide className="slide" srcLine={0} viewBox="0 0  1280 720">
      <div>Some Child Element</div>
    </Slide>
  );

describe("<Slide />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
