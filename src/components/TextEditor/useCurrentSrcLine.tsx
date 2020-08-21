/*
 *
 * Register to `scroll` event on TextArea and calculates and
 * returns the source line number at the top of the container.
 *
 */

import { useEffect } from "react";
import type { RefObject } from "react";

export function useCurrentSrcLine(
  ref: RefObject<HTMLTextAreaElement>,
  setLineNumber: (value: number) => void
): void {
  useEffect(() => {
    const node = ref.current;

    const handleScroll = () => {
      if (node) {
        const { scrollHeight, scrollTop, value } = node;
        const lineHeight = scrollHeight / value.split("\n").length; // height / line count
        // TODO round up or down
        setLineNumber(scrollTop / lineHeight);
      }
    };
    // TODO debounce
    node?.addEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [ref, setLineNumber]);
}
