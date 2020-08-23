import { useMemo, useEffect } from "react";
import type { Dispatch, RefObject } from "react";
import throttle from "lodash/throttle";
import { TEXT_AREA_LINE_HEIGHT } from "components/TextEditor";

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
        console.log("set text line");
        const { scrollHeight, scrollTop, value } = e.target;
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
    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, node]);

  /* Syncs text when previewLineNumber changes */
  // TODO smooth scrolling
  useEffect(() => {
    if (node) {
      console.log("sync text to preview");
      const scrollTop = previewLineNumber * TEXT_AREA_LINE_HEIGHT;

      /* Removes event listener before manipulating */
      node.removeEventListener("scroll", handleScroll);

      /* set element top to calculated scrollTop position */
      node.scrollTop = scrollTop;

      /* Adds back event listener when scroll is complete */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node.addEventListener("scroll", handleScroll);
        });
      });
    }
  }, [handleScroll, node, previewLineNumber]);
}
