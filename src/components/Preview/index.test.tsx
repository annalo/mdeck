import React from "react";
import { render } from "@testing-library/react";

import { Preview } from ".";

const renderComponent = () =>
  render(
    <Preview
      html="<section><h1>Title</h1></section><section><h3>Heading 3</h3></section>"
      setLineNumber={() => {}}
    />
  );

describe("<Preview />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
