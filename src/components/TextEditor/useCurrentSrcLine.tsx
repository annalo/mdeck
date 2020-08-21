/*
 *
 * Register to `scroll` event on TextArea.
 * Calculates the source line number at the top of
 * the container and dispatches the line number to
 * `MarkdownContext`.
 *
 */

import { useEffect } from "react";
import type { Dispatch, RefObject } from "react";

export function useCurrentSrcLine(
  ref: RefObject<HTMLTextAreaElement>,
  dispatch: Dispatch<any>
): void {
  useEffect(() => {
    const node = ref.current;
    const handleScroll = () => {
      if (node) {
        const { scrollHeight, scrollTop, value } = node;
        const lineHeight = scrollHeight / value.split("\n").length; // height / line count
        dispatch({
          type: "setLineNumber",
          lineNumber: Math.floor(scrollTop / lineHeight),
        });
      }
    };
    // TODO debounce
    node?.addEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [dispatch, ref]);
}
