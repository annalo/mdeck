import React from "react";
import { render, renderHook } from "test-utils";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import { useSlideEntries } from "contexts/SlideObserver";
import { useCodeLineEntries } from "contexts/CodeLineObserver";

import { Slide } from ".";
import { useSlideObserve } from "./useSlideObserve";
import { useCodeLineObserve } from "./useCodeLineObserve";

const component = <Slide htmlString="<svg><h1>Title</h1></svg>" index={0} />;

describe("<Slide />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render htmlString as React elements", () => {
    const { container } = render(component);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 svg {
        background-color: white;
      }

      <section
        class="c0 slide"
        id="slide-1"
      >
        <svg>
          <h1>
            Title
          </h1>
        </svg>
      </section>
    `);
  });

  test("should observe itself with SlideObserver", () => {
    const slideNumber = 1;
    const slideElement = document.createElement("div");
    const ref = { current: slideElement };

    const { result } = renderHook(() => {
      useSlideObserve({ ref, slideNumber });
      return useSlideEntries();
    });

    expect(result.current).toMatchObject({ [slideNumber]: slideElement });
  });

  test("should observe its code line elements with CodeLineObserver", () => {
    /* Create element with data-line for observer to pick up */
    const div = document.createElement("div");

    const codeLine = 1;
    const h1 = document.createElement("h1");
    h1.className = CODE_LINE_CLASS_NAME;
    h1.setAttribute(DATA_LINE_ATTRIBUTE, `${codeLine}`);
    div.appendChild(h1);

    const elements = <h1>Title</h1>;
    const ref = { current: div };

    const { result } = renderHook(() => {
      useCodeLineObserve({ elements, ref });
      return useCodeLineEntries();
    });

    expect(result.current).toMatchObject({ [codeLine]: h1 });
  });
});
