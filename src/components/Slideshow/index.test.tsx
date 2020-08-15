import React from "react";
import { render } from "@testing-library/react";

import { Slideshow } from ".";

const renderComponent = () =>
  render(
    <Slideshow
      slides={["<div><h1>Title</h1></div>", "<div><h3>Heading 3</h3></div>"]}
    />
  );

describe("<Slideshow />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
