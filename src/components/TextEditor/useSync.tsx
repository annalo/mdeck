import { useEffect } from "react";
import type { RefObject } from "react";

interface UseSyncProps {
  lineNumber: number;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useSync({ lineNumber, ref }: UseSyncProps): void {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      // sync text to preview
      const { scrollHeight, value } = node;
      node.scroll({
        top: (lineNumber / value.split("\n").length) * scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lineNumber, ref]);
}
