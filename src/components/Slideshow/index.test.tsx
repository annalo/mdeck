import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import {
  MarkdownContext,
  MarkdownContextProvider,
} from "contexts/MarkdownContext";

import { Slideshow } from ".";
import { useObservable } from "./useObservable";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

jest.mock("smooth-scroll-into-view-if-needed");
afterEach(() => jest.clearAllMocks());

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("useObservable", () => {
    test("should observe and return entries", () => {
      /* Create element with data-line for observer to pick up */
      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      h1.className = CODE_LINE_CLASS_NAME;
      h1.setAttribute(DATA_LINE_ATTRIBUTE, "0");
      div.appendChild(h1);

      const { result } = renderHook(() => useObservable());

      expect(result.current.entries).toMatchObject({});

      act(() => result.current.observe(div));

      expect(result.current.entries).toMatchObject({ 0: h1 });
    });
  });

  describe("useSyncSlideshow", () => {
    test("should sync slideshow to textLineNumber if there's an element with the data-line", () => {
      const textLineNumber = 2;
      const element = { test: "test" };
      const entries = { [textLineNumber]: element };

      renderHook(() => useSyncSlideshow({ entries, textLineNumber }));

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith(element, { block: "start" });
    });

    test("should not do anything if there is no element with the data-line", () => {
      const textLineNumber = 5;
      const entries = { 2: {} };

      renderHook(() => useSyncSlideshow({ entries, textLineNumber }));

      expect(scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe("useTrackSlideshowScroll", () => {
    const mockBoundingClientRect = (top) =>
      jest.fn(() => {
        return {
          width: 120,
          height: 120,
          top,
          left: 0,
          x: 0,
          y: 1,
          bottom: 0,
          right: 0,
          toJSON: jest.fn(),
        };
      });

    test("should set slideshowLineNumber to the top most element's data-line", () => {
      const slideshow = document.createElement("div");
      const h1 = document.createElement("h1");
      const h2 = document.createElement("h2");
      const h3 = document.createElement("h3");

      h1.getBoundingClientRect = mockBoundingClientRect(-5);
      h2.getBoundingClientRect = mockBoundingClientRect(2);
      h3.getBoundingClientRect = mockBoundingClientRect(50);

      const lineNumber = 2;
      const entries = { 0: h1, 50: h3, [lineNumber]: h2 };
      const ref = { current: slideshow };

      const wrapper = ({ children }) => (
        <MarkdownContextProvider>{children}</MarkdownContextProvider>
      );
      const { result } = renderHook(
        () => {
          const { state, dispatch } = useContext(MarkdownContext);
          useTrackSlideshowScroll({ dispatch, entries, isActive: true, ref });
          return state;
        },
        { wrapper }
      );

      expect(result.current.slideshowLineNumber).toBe(0);

      act(() => {
        fireEvent.scroll(slideshow, { target: { scrollY: 100 } });
      });

      expect(result.current.slideshowLineNumber).toBe(lineNumber);
    });
  });
});
