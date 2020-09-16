import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import {
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
});
