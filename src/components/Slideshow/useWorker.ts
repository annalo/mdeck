import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import { MarkdownWorker } from "utils/MarkdownWorker";

interface UseWorkerProps {
  dispatch: Dispatch<any>;
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
