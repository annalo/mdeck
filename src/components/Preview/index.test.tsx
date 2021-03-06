import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import { render, renderHook } from "utils/test-utils";

import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { ThemeProvider } from "components/App/ThemeProvider";
import {
  MARKDOWN_CONTEXT_INITIAL_STATE,
  MarkdownContextProvider,
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import {
  CodeLineObserverProvider,
  useCodeLineEntries,
} from "contexts/CodeLineObserver";

import { Preview } from ".";
import MarkdownWorker from "./markdown-worker";
import { useMarkdownWorker } from "./useMarkdownWorker";
import { useSyncPreview } from "./useSyncPreview";
import { useTrackPreviewScroll } from "./useTrackPreviewScroll";

jest.mock("smooth-scroll-into-view-if-needed");
jest.mock("./markdown-worker");

afterEach(() => jest.clearAllMocks());

describe("<Preview />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Preview />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render a Slide component for each element in 'htmlArray'", async () => {
    const md = "test";
    const htmlArray = [
      "<svg><h1>Title</h1></svg>",
      "<svg><p>Paragraph</p></svg>",
    ];
    const wrapper = ({ children }) => (
      <ThemeProvider>
        <MarkdownContextProvider
          initialState={{ ...MARKDOWN_CONTEXT_INITIAL_STATE, md, htmlArray }}
        >
          <SlideObserverProvider>
            <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
          </SlideObserverProvider>
        </MarkdownContextProvider>
      </ThemeProvider>
    );
    render(<Preview />, { wrapper });

    const article = screen.getByRole("article");
    await waitFor(() => {
      expect(article.childElementCount).toBe(htmlArray.length);
      expect(article.children[0].getAttribute("id")).toBe("slide-1");
      expect(article.children[1].getAttribute("id")).toBe("slide-2");
    });
  });

  describe("useMarkdownWorker", () => {
    test("should instantiate MarkdownWorker just once", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useMarkdownWorker({ dispatch, md });
      });

      md = "## Markdown String\n* Bullet 1";
      rerender();

      expect(MarkdownWorker).toHaveBeenCalledTimes(1);
    });

    test("should parse md with MarkdownWorker", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useMarkdownWorker({ dispatch, md });
      });

      md = "## Markdown String\n* Bullet 1";
      rerender();

      const workerInstance = MarkdownWorker.mock.instances[0];
      expect(workerInstance.parse).toHaveBeenCalledTimes(2);
    });
  });

  describe("useSyncPreview", () => {
    test("should sync slideshow to editorLine if there's an element with the data-line", () => {
      const editorLine = 2;
      const element = { test: "test" };
      const initialEntries = { [editorLine]: element };

      const wrapper = ({ children }) => (
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      );
      renderHook(
        () => {
          const entries = useCodeLineEntries();
          useSyncPreview({ entries, editorLine });
        },
        {
          wrapper,
        }
      );

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith(element, { block: "start" });
    });

    test("should not do anything if there is no element with the data-line", () => {
      const editorLine = 5;
      const entries = { 2: {} };

      renderHook(() => useSyncPreview({ entries, editorLine }));

      expect(scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe("useTrackPreviewScroll", () => {
    let slideshow;
    let line;
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

      line = 2;
      initialEntries = { 0: h1, 50: h3, [line]: h2 };
    });

    const wrapper = ({ children }) => (
      <MarkdownContextProvider>
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      </MarkdownContextProvider>
    );

    test("should set previewCodeLine to the top most element's data-line if isActive", () => {
      const ref = { current: slideshow };
      const { result } = renderHook(
        () => {
          const dispatch = useMarkdownDispatch();
          const entries = useCodeLineEntries();
          useTrackPreviewScroll({ dispatch, entries, isActive: true, ref });
          return useMarkdownState();
        },
        { wrapper }
      );

      expect(result.current.previewCodeLine).toBe(
        MARKDOWN_CONTEXT_INITIAL_STATE.editorLine
      );

      act(() => {
        fireEvent.scroll(slideshow, { target: { scrollY: 100 } });
      });
      expect(result.current.previewCodeLine).toBe(line);
    });

    test("should not set previewCodeLine if isActive is false", () => {
      const ref = { current: slideshow };
      const { result } = renderHook(
        () => {
          const dispatch = useMarkdownDispatch();
          const entries = useCodeLineEntries();
          useTrackPreviewScroll({ dispatch, entries, isActive: false, ref });
          return useMarkdownState();
        },
        { wrapper }
      );

      act(() => {
        fireEvent.scroll(slideshow, { target: { scrollY: 100 } });
      });
      expect(result.current.previewCodeLine).toBe(
        MARKDOWN_CONTEXT_INITIAL_STATE.editorLine
      );
    });
  });
});
