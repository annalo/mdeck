import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render, renderHook } from "utils/test-utils";

import screenfull from "screenfull";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContextProvider,
  useMarkdownDispatch,
} from "contexts/MarkdownContext";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";
import { SlideObserverProvider } from "contexts/SlideObserver";

import { Preview } from ".";
import MarkdownWorker from "./markdown-worker";
import { useWorker } from "./useWorker";

jest.mock("./markdown-worker");
jest.mock("screenfull", () => ({
  request: jest.fn(),
  off: jest.fn(),
  on: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

describe("<Preview />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Preview />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should disable FULLSCREEN button if no markdown string", () => {
    render(<Preview />);

    const button = screen.getByRole("button", { name: /fullscreen/i });
    expect(button).toBeDisabled();
  });

  test("should fullscreen slideshow when fullscreen button is clicked", () => {
    const md = "test test";
    const wrapperWithState = ({ children }) => (
      <MarkdownContextProvider
        initialState={{ ...MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE, md }}
      >
        <SlideObserverProvider>
          <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
        </SlideObserverProvider>
      </MarkdownContextProvider>
    );
    render(<Preview />, { wrapper: wrapperWithState });

    const button = screen.getByRole("button", { name: /fullscreen/i });
    fireEvent.click(button);

    const slideshow = screen.getByRole("article");
    expect(screenfull.request).toHaveBeenNthCalledWith(1, slideshow);
  });

  describe("useWorker", () => {
    test("should instantiate MarkdownWorker just once", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useWorker({ dispatch, md });
      });

      md = "## Markdown String\n* Bullet 1";
      rerender();

      expect(MarkdownWorker).toHaveBeenCalledTimes(1);
    });

    test("should parse md with MarkdownWorker", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useWorker({ dispatch, md });
      });

      md = "## Markdown String\n* Bullet 1";
      rerender();

      const workerInstance = MarkdownWorker.mock.instances[0];
      expect(workerInstance.parse).toHaveBeenCalledTimes(2);
    });
  });
});
