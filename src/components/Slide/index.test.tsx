import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";

import {
  SlideshowObserver,
  SlideshowObserverProvider,
} from "contexts/SlideshowObserver";
import { Slide } from ".";

const component = (
  <Slide className="slide" index={0} srcLine={0} viewBox="0 0 1280 720">
    <div>Some Child Element</div>
  </Slide>
);

describe("<Slide />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders an svg element with viewBox and data-line attributes", () => {
    render(component);
    const svg = screen.getByRole("img");

    expect(svg).toHaveAttribute("viewBox");
    expect(svg).toHaveAttribute("data-line");
  });

  // TODO not sure what's a better way to test that the value of
  // the context was updated without testing an actual dom element
  test("observes itself in SlideshowObserver after render", () => {
    const TestObserverEntriesComponent = () => {
      const { entries } = useContext(SlideshowObserver);
      return <div data-testid="test-entries-length">{entries.length}</div>;
    };

    render(
      <SlideshowObserverProvider>
        {component}
        <TestObserverEntriesComponent />
      </SlideshowObserverProvider>
    );

    expect(screen.getByTestId("test-entries-length")).toHaveTextContent("1");
  });
});
