// TODO refactor

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
import debounce from "lodash/debounce";

interface Props {
  ref: RefObject<HTMLTextAreaElement>;
  isHovered: boolean;
  dispatch: Dispatch<any>;
}

export function useLineNumberOnScroll({
  ref,
  isHovered,
  dispatch,
}: Props): void {
  useEffect(() => {
    const node = ref.current;

    const setLineNumber = (lineNumber) =>
      dispatch({
        type: "setLineNumber",
        lineNumber,
      });

    const handleScrollDebounced = debounce(() => {
      if (isHovered && node) {
        const { scrollHeight, scrollTop, value } = node;
        const lineHeight = scrollHeight / value.split("\n").length;
        setLineNumber(Math.floor(scrollTop / lineHeight));
      }
    }, 500);

    node?.addEventListener("scroll", handleScrollDebounced);
    return () => node?.removeEventListener("scroll", handleScrollDebounced);
  }, [dispatch, isHovered, ref]);
}
