import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context";

import MarkdownWorker from "./markdown-worker";

interface UseWorkerProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  md: MarkdownString;
}

export const useWorker = ({ dispatch, md }: UseWorkerProps): void => {
  const workerRef = useRef<MarkdownWorker | null>(null);

  useEffect(() => {
    workerRef.current = new MarkdownWorker(dispatch);
    return () => {
      workerRef.current?.terminate();
    };
  }, [dispatch]);

  useEffect(() => {
    const worker = workerRef.current;
    // TODO throttle
    worker?.parse(md);
  }, [md]);
};
