import React from "react";
import { render } from "@testing-library/react";

import { Slide } from ".";

const component = (
  <Slide htmlString="<h1>Title</h1>">
    <div>Some Child Element</div>
  </Slide>
);

describe("<Slide />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });
});
