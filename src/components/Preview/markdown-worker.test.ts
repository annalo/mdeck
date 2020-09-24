import { act } from "@testing-library/react-hooks";
import { renderHook } from "utils/test-utils";

import Worker from "worker-loader!./worker"; // eslint-disable-line
import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import MarkdownWorker from "./markdown-worker";

afterEach(() => jest.clearAllMocks());

describe("MarkdownWorker", () => {
  describe("worker", () => {
    test("should initialize with a new web worker", () => {
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        const worker = new MarkdownWorker(dispatch);
        return worker;
      });

      expect(Worker).toHaveBeenCalledTimes(1);
      expect(result.current.worker).toBeInstanceOf(Worker);
    });

    test("should set htmlArray on 'onmessage'", () => {
      const htmlArray = ["test", "test"];
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        const state = useMarkdownState();
        const markdownWorker = new MarkdownWorker(dispatch);
        return { state, markdownWorker };
      });

      act(() =>
        result.current.markdownWorker.worker.onmessage({ data: htmlArray })
      );

      expect(result.current.state.htmlArray).toBe(htmlArray);
    });
  });

  describe("parse/1", () => {
    test("should post a message to worker with argument md", () => {
      const md = "## Title";
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        const worker = new MarkdownWorker(dispatch);
        return worker;
      });

      act(() => result.current.parse(md));

      expect(Worker.mock.instances[0].postMessage).toHaveBeenNthCalledWith(
        1,
        md
      );
    });
  });

  describe("terminate", () => {
    test("should terminate the web worker", () => {
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        const worker = new MarkdownWorker(dispatch);
        return worker;
      });

      act(() => result.current.terminate());

      expect(Worker.mock.instances[0].terminate).toHaveBeenCalledTimes(1);
    });
  });
});
