import { useEffect } from "react";
import type { RefObject } from "react";

interface UseSyncProps {
  isActive: boolean;
  lineNumber: number;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useSync({ isActive, lineNumber, ref }: UseSyncProps): void {
  useEffect(() => {
    if (isActive) return;

    const node = ref.current;
    if (node) {
      // sync text to preview
      const { scrollHeight, value } = node;
      node.scroll({
        top: (lineNumber / value.split("\n").length) * scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isActive, lineNumber, ref]);
}
