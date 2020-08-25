import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import throttle from "lodash/throttle";

import { usePaneIsActive } from "utils/usePaneIsActive";

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
  const isActive = usePaneIsActive(ref);

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
      }, 200),
    [dispatch]
  );

  /* Initializes event listener on "scroll" */
  useEffect(() => {
    if (isActive) {
      node?.addEventListener("scroll", handleScroll);
    } else {
      node?.removeEventListener("scroll", handleScroll);
    }

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [isActive, handleScroll, node]);

  /* Syncs text when slideshowLineNumber changes */
  // TODO smooth scrolling
  useEffect(() => {
    if (node) {
      console.log("sync text to slideshow");
      const scrollTop = slideshowLineNumber * textAreaLineHeight;
      node.scrollTop = scrollTop;
    }
  }, [node, slideshowLineNumber, textAreaLineHeight]);
}
