import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

import { Home } from "./index";

const renderer = createRenderer();

describe("<Home />", () => {
  it("should render and match the snapshot", () => {
    renderer.render(<Home />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
