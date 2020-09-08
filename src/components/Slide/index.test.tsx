import React from "react";
import { render, screen } from "@testing-library/react";

import { debug } from "webpack";
import { Slide } from ".";

const observeMock = jest.fn();
const component = (
  <Slide
    htmlString="<svg><h1>Title</h1></svg>"
    index={0}
    observe={observeMock}
  />
);

describe("<Slide />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render htmlString as React elements", () => {
    const { container } = render(component);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        id="slide-1"
      >
        <svg>
          <h1>
            Title
          </h1>
        </svg>
      </div>
    `);
  });
});
