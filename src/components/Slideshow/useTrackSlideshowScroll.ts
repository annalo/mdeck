import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import type { Dispatch, RefObject } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context";
import { MarkdownContextReducerActionType } from "types/markdown-context";

interface UseTrackSlideshowScrollProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  entries: SlideshowObserver.Entries;
  isActive: boolean;
  ref: RefObject<HTMLDivElement>;
}

export const useTrackSlideshowScroll = ({
  dispatch,
  entries,
  isActive,
  ref,
}: UseTrackSlideshowScrollProps): void => {
  /*
   * Finds the top most element in view (within 0px - 18px from the top)
   * IF element THEN set `slideshowLineNumber` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const withinBounds = R.both(R.gte(R.__, 0), R.lte(R.__, 18));
        const isTopElement = (e) => withinBounds(e.getBoundingClientRect().top);
        const setLineNumber = (lineNumber) =>
          dispatch({
            type: MarkdownContextReducerActionType.SetSlideshowLineNumber,
            slideshowLineNumber: lineNumber,
          });

        const topElement = Object.entries(entries).find(([, entry]) =>
          isTopElement(entry)
        );
        if (topElement) setLineNumber(parseInt(topElement[0], 10));
      }, 100),
    [dispatch, entries]
  );

  /* Adds/Removes event listener on 'scroll' depending on pane `isActive` */
  useEffect(() => {
    const node = ref.current;

    isActive
      ? node?.addEventListener("scroll", handleScroll, { passive: true })
      : node?.removeEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [isActive, handleScroll, ref]);
};
