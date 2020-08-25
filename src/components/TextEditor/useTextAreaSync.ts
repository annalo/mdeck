import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import { usePaneIsActive } from "utils/usePaneIsActive";

interface UseTextAreaSyncProps {
  dispatch: Dispatch<any>;
  ref: RefObject<HTMLTextAreaElement>;
  slideshowLineNumber: number;
  textAreaLineHeight: number;
}

export const useTextAreaSync = ({
  dispatch,
  ref,
  slideshowLineNumber,
  textAreaLineHeight,
}: UseTextAreaSyncProps): void => {
  const node = ref.current;
  const isActive = usePaneIsActive(ref, true);

  const handleScroll = useMemo(
    () =>
      throttle((e) => {
        const { scrollHeight, scrollTop, value } = e.target;
        dispatch({
          type: "setTextLineNumber",
          textLineNumber: Math.floor(
            R.divide(
              scrollTop,
              R.divide(scrollHeight, R.length(R.split("\n", value)))
            )
          ),
        });
      }, 200),
    [dispatch]
  );

  /* Adds/Removes event listener on 'scroll' depending on pane `isActive` */
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
      node.scrollTop = slideshowLineNumber * textAreaLineHeight;
    }
  }, [node, slideshowLineNumber, textAreaLineHeight]);
};
