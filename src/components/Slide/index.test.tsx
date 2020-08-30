import React from "react";
import { render } from "@testing-library/react";
import { Slide } from ".";

describe("<Slide />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(
      <Slide className="slide" srcLine={0} viewBox="0 0  1280 720">
        <div>Some Child Element</div>
      </Slide>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
