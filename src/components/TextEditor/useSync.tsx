import { useMemo, useEffect } from "react";
import type { Dispatch, RefObject } from "react";
import debounce from "lodash/debounce";

interface UseSyncProps {
  dispatch: Dispatch<any>;
  previewLineNumber: number;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useSync({
  dispatch,
  previewLineNumber,
  ref,
}: UseSyncProps): void {
  const node = ref.current;
  const handleScrollDebounced = useMemo(
    () =>
      debounce((e) => {
        const { scrollHeight, scrollTop, value } = e.target;
        dispatch({
          type: "setTextLineNumber",
          textLineNumber: Math.ceil(
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

  /* Syncs text when previewLineNumber changes */
  useEffect(() => {
    console.log("syncs text");

    if (node) {
      const { scrollHeight, value } = node;
      /* Removes event listener before manipulating */
      node.removeEventListener("scroll", handleScrollDebounced);
      node.scroll({
        top: (previewLineNumber / value.split("\n").length) * scrollHeight,
        behavior: "smooth",
      });
      /* Adds back event listener */
      node.addEventListener("scroll", handleScrollDebounced);
    }
  }, [handleScrollDebounced, node, previewLineNumber]);
}
