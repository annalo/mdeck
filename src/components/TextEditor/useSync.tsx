import { useMemo, useEffect } from "react";
import type { Dispatch, RefObject } from "react";
import debounce from "lodash/debounce";

interface UseSyncProps {
  dispatch: Dispatch<any>;
  isActive: boolean;
  lineNumber: number;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useSync({
  dispatch,
  isActive,
  lineNumber,
  ref,
}: UseSyncProps): void {
  const node = ref.current;
  const handleScrollDebounced = useMemo(
    () =>
      debounce((e) => {
        const { scrollHeight, scrollTop, value } = e.target;
        dispatch({
          type: "setLineNumber",
          lineNumber: Math.ceil(
            scrollTop / (scrollHeight / value.split("\n").length)
          ),
        });
      }, 200),
    [dispatch]
  );

  /* Initializes event listener on "scroll" */
  useEffect(() => {
    console.log("initialize listener");

    node?.addEventListener("scroll", handleScrollDebounced);
    return () => node?.removeEventListener("scroll", handleScrollDebounced);
  }, [handleScrollDebounced, node]);

  /* Syncs text when lineNumber changes */
  useEffect(() => {
    if (isActive) return;
    console.log("syncs text");

    if (node) {
      const { scrollHeight, value } = node;
      /* Removes event listener before manipulating */
      node.removeEventListener("scroll", handleScrollDebounced);
      node.scroll({
        top: (lineNumber / value.split("\n").length) * scrollHeight,
        behavior: "smooth",
      });
      /* Adds back event listener */
      node.addEventListener("scroll", handleScrollDebounced);
    }
  }, [handleScrollDebounced, isActive, lineNumber, node]);
}
