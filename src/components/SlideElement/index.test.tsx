import React from "react";
import { render, screen } from "@testing-library/react";
import { SlideElement } from ".";

const component = (
  <SlideElement attributes={{}} elementTag="h1" srcLine={2}>
    <div>Some Child Element</div>
  </SlideElement>
);
describe("<SlideElement />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the element type from elementTag prop", () => {
    render(component);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
  });

  test("rendered element should have data-line attribute", () => {
    const { container } = render(component);
    expect(container.firstChild).toHaveAttribute("data-line");
  });
});
