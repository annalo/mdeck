import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import { render, renderHook } from "test-utils";

import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContextProvider,
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import {
  CodeLineObserverProvider,
  useCodeLineEntries,
} from "contexts/CodeLineObserver";

import { Slideshow } from ".";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

jest.mock("smooth-scroll-into-view-if-needed");

afterEach(() => jest.clearAllMocks());

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const htmlArray = [
      "<svg><h1>Title</h1></svg>",
      "<svg><p>Paragraph</p></svg>",
    ];
    const ref = { current: document.createElement("div") };
    const { asFragment } = render(
      <Slideshow
        ref={ref}
        dispatch={jest.fn()}
        htmlArray={htmlArray}
        textLineNumber={0}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render a Slide component for each element in 'htmlArray'", async () => {
    const htmlArray = [
      "<svg><h1>Title</h1></svg>",
      "<svg><p>Paragraph</p></svg>",
    ];
    const ref = { current: document.createElement("div") };
    render(
      <Slideshow
        ref={ref}
        dispatch={jest.fn()}
        htmlArray={htmlArray}
        textLineNumber={0}
      />
    );

    const article = screen.getByRole("article");
    await waitFor(() => {
      expect(article.childElementCount).toBe(htmlArray.length);
      expect(article.children[0].getAttribute("id")).toBe("slide-1");
      expect(article.children[1].getAttribute("id")).toBe("slide-2");
    });
  });

  describe("useSyncSlideshow", () => {
    test("should sync slideshow to textLineNumber if there's an element with the data-line", () => {
      const textLineNumber = 2;
      const element = { test: "test" };
      const initialEntries = { [textLineNumber]: element };

      const wrapper = ({ children }) => (
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      );
      renderHook(
        () => {
          const entries = useCodeLineEntries();
          useSyncSlideshow({ entries, textLineNumber });
        },
        {
          wrapper,
        }
      );

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
    let slideshow;
    let lineNumber;
    let initialEntries;
    function mockBoundingClientRect(top) {
      return jest.fn(() => ({
        width: 120,
        height: 120,
        top,
        left: 0,
        x: 0,
        y: 1,
        bottom: 0,
        right: 0,
        toJSON: jest.fn(),
      }));
    }

    beforeEach(() => {
      slideshow = document.createElement("div");
      const h1 = document.createElement("h1");
      const h2 = document.createElement("h2");
      const h3 = document.createElement("h3");

      h1.getBoundingClientRect = mockBoundingClientRect(-5);
      h2.getBoundingClientRect = mockBoundingClientRect(2);
      h3.getBoundingClientRect = mockBoundingClientRect(50);

      lineNumber = 2;
      initialEntries = { 0: h1, 50: h3, [lineNumber]: h2 };
    });

    const wrapper = ({ children }) => (
      <MarkdownContextProvider>
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      </MarkdownContextProvider>
    );

    test("should set slideshowLineNumber to the top most element's data-line if isActive", () => {
      const ref = { current: slideshow };
      const { result } = renderHook(
        () => {
          const dispatch = useMarkdownDispatch();
          const entries = useCodeLineEntries();
          useTrackSlideshowScroll({ dispatch, entries, isActive: true, ref });
          return useMarkdownState();
        },
        { wrapper }
      );

      expect(result.current.slideshowLineNumber).toBe(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.textLineNumber
      );

      act(() => {
        fireEvent.scroll(slideshow, { target: { scrollY: 100 } });
      });

      expect(result.current.slideshowLineNumber).toBe(lineNumber);
    });

    test("should not set slideshowLineNumber if isActive is false", () => {
      const ref = { current: slideshow };
      const { result } = renderHook(
        () => {
          const dispatch = useMarkdownDispatch();
          const entries = useCodeLineEntries();
          useTrackSlideshowScroll({ dispatch, entries, isActive: false, ref });
          return useMarkdownState();
        },
        { wrapper }
      );

      act(() => {
        fireEvent.scroll(slideshow, { target: { scrollY: 100 } });
      });

      expect(result.current.slideshowLineNumber).toBe(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.textLineNumber
      );
    });
  });
});
