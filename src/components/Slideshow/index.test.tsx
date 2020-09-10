import React, { useContext } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContext,
  MarkdownContextProvider,
} from "contexts/MarkdownContext";

import { Slideshow } from ".";
import MarkdownWorker from "./markdown-worker";

import { useObservable } from "./useObservable";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";
import { useWorker } from "./useWorker";

jest.mock("smooth-scroll-into-view-if-needed");
jest.mock("utils/MarkdownWorker");

afterEach(() => jest.clearAllMocks());

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render a Slide component for each element in 'htmlArray'", async () => {
    const htmlArray = [
      "<svg><h1>Title</h1></svg>",
      "<svg><p>Paragraph</p></svg>",
    ];
    render(
      <MarkdownContextProvider
        initialState={{
          htmlArray,
          md: "",
          slideshowLineNumber: 0,
          textLineNumber: 0,
        }}
      >
        <Slideshow />
      </MarkdownContextProvider>
    );

    const article = screen.getByRole("article");
    await waitFor(() => {
      expect(article.childElementCount).toBe(htmlArray.length);
      expect(article.children[0].getAttribute("id")).toBe("slide-1");
      expect(article.children[1].getAttribute("id")).toBe("slide-2");
    });
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
    let slideshow;
    let entries;
    let lineNumber;
    const mockBoundingClientRect = (top) =>
      jest.fn(() => ({
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

    beforeEach(() => {
      slideshow = document.createElement("div");
      const h1 = document.createElement("h1");
      const h2 = document.createElement("h2");
      const h3 = document.createElement("h3");

      h1.getBoundingClientRect = mockBoundingClientRect(-5);
      h2.getBoundingClientRect = mockBoundingClientRect(2);
      h3.getBoundingClientRect = mockBoundingClientRect(50);

      lineNumber = 2;
      entries = { 0: h1, 50: h3, [lineNumber]: h2 };
    });

    const wrapper = ({ children }) => (
      <MarkdownContextProvider>{children}</MarkdownContextProvider>
    );

    test("should set slideshowLineNumber to the top most element's data-line if isActive", () => {
      const ref = { current: slideshow };
      const { result } = renderHook(
        () => {
          const { dispatch, state } = useContext(MarkdownContext);
          useTrackSlideshowScroll({ dispatch, entries, isActive: true, ref });
          return state;
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
          const { dispatch, state } = useContext(MarkdownContext);
          useTrackSlideshowScroll({ dispatch, entries, isActive: false, ref });
          return state;
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

  describe("useWorker", () => {
    const wrapper = ({ children }) => (
      <MarkdownContextProvider>{children}</MarkdownContextProvider>
    );

    test("should instantiate MarkdownWorker just once", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(
        () => {
          const { dispatch } = useContext(MarkdownContext);
          useWorker({ dispatch, md });
        },
        { wrapper }
      );

      md = "## Markdown String\n* Bullet 1";
      rerender();

      expect(MarkdownWorker).toHaveBeenCalledTimes(1);
    });

    test("should parse md with MarkdownWorker", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(
        () => {
          const { dispatch } = useContext(MarkdownContext);
          useWorker({ dispatch, md });
        },
        { wrapper }
      );

      md = "## Markdown String\n* Bullet 1";
      rerender();

      const workerInstance = MarkdownWorker.mock.instances[0];
      expect(workerInstance.parse).toHaveBeenCalledTimes(2);
    });
  });
});
