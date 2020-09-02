import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";

import {
  SlideshowObserver,
  SlideshowObserverProvider,
} from "contexts/SlideshowObserver";
import { SlideElement } from ".";

const component = (
  <SlideElement attributes={{}} elementTag="h1" srcLine={2}>
    <div>Some Child Element</div>
  </SlideElement>
);
describe("<SlideElement />", () => {
  test("should render and match the snapshot", () => {
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
