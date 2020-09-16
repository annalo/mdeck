import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownProvider,
  useMarkdownDispatch,
} from "contexts/MarkdownContext";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";
import { SlideObserverProvider } from "contexts/SlideObserver";

import { Preview } from ".";
import MarkdownWorker from "./markdown-worker";
import { useWorker } from "./useWorker";

jest.mock("screenfull");
jest.mock("./markdown-worker");

afterEach(() => jest.clearAllMocks());

describe("<Preview />", () => {
  const wrapper = ({ children }) => (
    <MarkdownProvider>
      <SlideObserverProvider>
        <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
      </SlideObserverProvider>
    </MarkdownProvider>
  );
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Preview />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  describe("useWorker", () => {
    test("should instantiate MarkdownWorker just once", () => {
      let md = "## Markdown String";
      const { rerender } = renderHook(
        () => {
          const dispatch = useMarkdownDispatch();
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
          const dispatch = useMarkdownDispatch();
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

  describe("usePresentation", () => {
    const htmlArray = [
      "<svg data-line='1'>1</svg>",
      "<svg data-line='2'>2</svg>",
      "<svg data-line='3'>3</svg>",
    ];
    const wrapperWithMarkdownValues = ({ children }) => (
      <MarkdownProvider
        initialValues={{ ...MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE, htmlArray }}
      >
        <SlideObserverProvider>
          <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
        </SlideObserverProvider>
      </MarkdownProvider>
    );

    test("should not be in fullscreen by default", () => {
      render(<Preview />, { wrapper: wrapperWithMarkdownValues });
      expect(document.fullscreen).not.toBeTruthy();
    });

    test("should fullscreen slideshow when fullscreen button is clicked", async () => {
      render(<Preview />, { wrapper: wrapperWithMarkdownValues });

      expect(document.fullscreen).not.toBeTruthy();

      const button = screen.getByRole("button");
      fireEvent.click(button);
      waitFor(() => expect(document.fullscreen).toBeTruthy());
    });
  });
});
