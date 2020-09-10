import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MarkdownProvider,
  useMarkdownDispatch,
} from "contexts/MarkdownContext";

import { Preview } from ".";
import MarkdownWorker from "./markdown-worker";
import { useWorker } from "./useWorker";

jest.mock("./markdown-worker");

afterEach(() => jest.clearAllMocks());

describe("<Preview />", () => {
  test("should render and match the snapshot", () => {
    const wrapper = ({ children }) => (
      <MarkdownProvider>{children}</MarkdownProvider>
    );
    const { asFragment } = render(<Preview />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  describe("useWorker", () => {
    const wrapper = ({ children }) => (
      <MarkdownProvider>{children}</MarkdownProvider>
    );

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
