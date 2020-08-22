import { useEffect } from "react";
import type { RefObject } from "react";

interface UseSyncProps {
  isHovered: boolean;
  lineNumber: number;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useSync({ isHovered, lineNumber, ref }: UseSyncProps): void {
  useEffect(() => {
    if (isHovered) return;

    const node = ref.current;
    if (node) {
      // sync text to preview
      const { scrollHeight, value } = node;
      // TODO animate scroll
      node.scrollTop = (lineNumber / value.split("\n").length) * scrollHeight;
    }
  }, [isHovered, lineNumber, ref]);
}
