import React from "react";
import { render, renderHook } from "utils/test-utils";

import { DATA_LINE_ATTRIBUTE } from "utils/parsePlugins/injectLineNumber";
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
      .c0 {
        margin: 0.5em;
        border: 1px solid #ededed;
        box-shadow: 0px 1px 2px 1px #ededed70;
      }

      .c0 section {
        -webkit-align-items: stretch;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        background-color: #fefefe;
        color: #292929;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        font-size: 25px;
        height: 100%;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 3em;
        width: 100%;
      }

      .c0 section * {
        margin-top: 0;
      }

      .c0 section *:last-child {
        margin-bottom: 0 !important;
      }

      .c0 section blockquote {
        border-left: 0.25em solid #d4d4d450;
        margin-left: 0;
        padding: 0 1em;
      }

      .c0 section pre {
        background-color: #d4d4d420;
        border: 1px solid grey;
        border-radius: 3px;
        line-height: 1em;
        overflow: visible;
        padding: 0.5em;
      }

      .c0 section ul.contains-task-list {
        list-style-type: none;
        padding-left: 0;
      }

      .c0 section ul.contains-task-list .task-list-item-checkbox {
        margin-left: 0.6em;
        margin-right: 0.3em;
        -webkit-transform: scale(1.5);
        -ms-transform: scale(1.5);
        transform: scale(1.5);
      }

      .c0 section table {
        border-collapse: collapse;
        width: 80%;
      }

      .c0 section table tr:nth-child(even) {
        background-color: #d6d6d640;
      }

      .c0 section table th,
      .c0 section table td {
        padding: 0.3em;
      }

      .c0 section table,
      .c0 section th,
      .c0 section td {
        border: 1px solid #d6d6d6;
      }

      <div
        class="c0 slide"
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

  describe("useSlideObserve", () => {
    test("should observe itself", () => {
      const slideNumber = 1;
      const slideElement = document.createElement("div");
      const ref = { current: slideElement };

      const { result } = renderHook(() => {
        useSlideObserve({ ref, slideNumber });
        return useSlideEntries();
      });

      expect(result.current).toMatchObject({ [slideNumber]: slideElement });
    });
  });

  describe("useCodeLineObserve", () => {
    test("should observe its code line elements", () => {
      /* Create element with data-line for observer to pick up */
      const div = document.createElement("div");

      const codeLine = 1;
      const h1 = document.createElement("h1");
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
});
