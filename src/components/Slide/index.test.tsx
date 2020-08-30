import React from "react";
import { render, screen } from "@testing-library/react";
import { Slide } from ".";

const component = (
  <Slide className="slide" index={0} srcLine={0} viewBox="0 0 1280 720">
    <div>Some Child Element</div>
  </Slide>
);

describe("<Slide />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders an svg element with viewBox and data-line attributes", () => {
    render(component);

    const svg = screen.getByRole("img");
    screen.debug(svg);
    expect(svg).toHaveAttribute("viewBox");
    expect(svg).toHaveAttribute("data-line");
  });

  // test("observes itself with SlideshowObserver");
});
