import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context-reducer-action";

import MarkdownWorker from "./markdown-worker";

interface UseWorkerProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  md: MarkdownString;
}

function useWorker({ dispatch, md }: UseWorkerProps): void {
  const workerRef = useRef<MarkdownWorker | null>(null);

  useEffect(() => {
    workerRef.current = new MarkdownWorker(dispatch);
    return () => {
      workerRef.current?.terminate();
    };
  }, [dispatch]);

  useEffect(() => {
    const worker = workerRef.current;
    worker?.parse(md);
  }, [md]);
}

export { useWorker };
