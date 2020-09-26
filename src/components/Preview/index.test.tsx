import React from "react";
import { render, renderHook } from "utils/test-utils";

import { useMarkdownDispatch } from "contexts/MarkdownContext";

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
