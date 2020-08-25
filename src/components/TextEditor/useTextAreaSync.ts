import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import throttle from "lodash/throttle";

interface UseTextAreaSyncProps {
  dispatch: Dispatch<any>;
  ref: RefObject<HTMLTextAreaElement>;
  slideshowLineNumber: number;
  textAreaLineHeight: number;
}

export function useTextAreaSync({
  dispatch,
  ref,
  slideshowLineNumber,
  textAreaLineHeight,
}: UseTextAreaSyncProps): void {
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
      }, 500),
    [dispatch]
  );

  /* Initializes event listener on "scroll" */
  useEffect(() => {
    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, node]);

  /* Syncs text when slideshowLineNumber changes */
  // TODO smooth scrolling
  useEffect(() => {
    if (node) {
      console.log("sync text to preview");
      const scrollTop = slideshowLineNumber * textAreaLineHeight;

      /* Removes event listener before manipulating */
      node.removeEventListener("scroll", handleScroll);

      /* set element top to calculated scrollTop position */
      node.scrollTop = scrollTop;

      /* Adds back event listener when scroll is complete */
      requestAnimationFrame(() => {
        requestAnimationFrame(() =>
          node.addEventListener("scroll", handleScroll)
        );
      });
    }
  }, [handleScroll, node, slideshowLineNumber, textAreaLineHeight]);
}
