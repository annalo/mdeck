import { useMemo, useEffect } from "react";
import type { Dispatch, RefObject } from "react";
import throttle from "lodash/throttle";

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
  const handleScroll = useMemo(
    () =>
      throttle((e) => {
        const { scrollHeight, scrollTop, value } = e.target;
        console.log("set text line number");
        dispatch({
          type: "setTextLineNumber",
          textLineNumber: Math.floor(
            scrollTop / (scrollHeight / value.split("\n").length)
          ),
        });
      }, 50),
    [dispatch]
  );

  /* Initializes event listener on "scroll" */
  useEffect(() => {
    console.log("initialize listener");

    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, node]);

  /* Syncs text when previewLineNumber changes */
  useEffect(() => {
    console.log("syncs text");

    if (node) {
      const { scrollHeight, value } = node;
      const scrollTop =
        (previewLineNumber / value.split("\n").length) * scrollHeight;
      /* Removes event listener before manipulating */
      node.removeEventListener("scroll", handleScroll);

      /* Adds back event listener if scroll is complete */
      const checkScrollEnd = () => {
        if (node.scrollTop === scrollTop) {
          node.addEventListener("scroll", handleScroll);
        }
        requestAnimationFrame(checkScrollEnd);
      };
      requestAnimationFrame(checkScrollEnd);
      /* set element top to calculated scrollTop position */
      node.scroll({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [handleScroll, node, previewLineNumber]);
}
