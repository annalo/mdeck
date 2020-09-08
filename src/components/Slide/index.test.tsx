import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import { useObservable } from "components/Slideshow/useObservable";
import { Slide } from ".";
import { useObserve } from "./useObserve";

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

  test("should observe itself", () => {
    /* Create element with data-line for observer to pick up */
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.className = CODE_LINE_CLASS_NAME;
    h1.setAttribute(DATA_LINE_ATTRIBUTE, "0");
    div.appendChild(h1);

    const elements = <h1>Title</h1>;
    const ref = { current: div };

    const { result } = renderHook(() => {
      const { entries, observe } = useObservable();
      useObserve({ elements, ref, observe });
      return entries;
    });

    expect(result.current).toMatchObject({ 0: h1 });
  });
});
