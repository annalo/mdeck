import React from "react";
import { render } from "@testing-library/react";

import { Slide } from ".";

const observeMock = jest.fn();
const component = (
  <Slide htmlString="<h1>Title</h1>" index={0} observe={observeMock}>
    <div>Some Child Element</div>
  </Slide>
);

describe("<Slide />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });
});
