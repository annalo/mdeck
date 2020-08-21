/*
 *
 * Register to `scroll` event on TextArea and calculates and
 * returns the source line number at the top of the container.
 *
 */

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useCurrentSrcLine(ref: RefObject<HTMLTextAreaElement>): number {
  const [srcLine, setSrcLine] = useState(0);

  useEffect(() => {
    const node = ref.current;

    const handleScroll = () => {
      if (node) {
        const { scrollHeight, scrollTop, value } = node;
        const lineHeight = scrollHeight / value.split("\n").length; // height / line count
        // TODO round up or down
        setSrcLine(scrollTop / lineHeight);
      }
    };
    // TODO debounce
    node?.addEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return srcLine;
}
