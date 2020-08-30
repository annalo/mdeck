import React from "react";
import { render } from "@testing-library/react";
import { SlideElement } from ".";

describe("<SlideElement />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <SlideElement attributes={{}} elementTag="h1" srcLine={2}>
        <div>Some Child Element</div>
      </SlideElement>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
