import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { MarkdownContextReducerActionType } from "types/markdown-context";

import { MarkdownWorker } from "utils/MarkdownWorker";

interface UseWorkerProps {
  dispatch: Dispatch<MarkdownContextReducerActionType>;
  md: string;
}

export const useWorker = ({ dispatch, md }: UseWorkerProps) => {
  const workerRef = useRef<any>(null);

  useEffect(() => {
    workerRef.current = new MarkdownWorker(dispatch);
    return () => {
      workerRef.current.terminate();
    };
  }, [dispatch]);

  useEffect(() => {
    const worker = workerRef.current;
    worker.parse(md);
  }, [md]);
};
