import React from "react";
import { render } from "@testing-library/react";

import { Preview } from ".";

const renderComponent = () =>
  render(
    <Preview
      slides={["<div><h1>Title</h1></div>", "<div><h3>Heading 3</h3></div>"]}
    />
  );

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
