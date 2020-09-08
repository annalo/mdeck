import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import type { Dispatch, RefObject } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context";
import { MarkdownContextReducerActionType } from "types/markdown-context";

import { usePaneIsActive } from "utils/usePaneIsActive";

interface UseTrackSlideshowScrollProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  entries: SlideshowObserver.Entries;
  ref: RefObject<HTMLDivElement>;
}

export const useTrackSlideshowScroll = ({
  dispatch,
  entries,
  ref,
}: UseTrackSlideshowScrollProps): void => {
  const node = ref.current;
  const isActive = usePaneIsActive({ ref, initialValue: false });

  /*
   * Finds the top most element in view (within 0px - 18px from the top)
   * IF element THEN set `slideshowLineNumber` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const withinBounds = R.both(R.gte(R.__, 0), R.lte(R.__, 18));
        const isTopElement = (e) => withinBounds(e.getBoundingClientRect().top);
        const getLineNumber = R.pipe(R.path(["dataset", "line"]), parseInt);
        const setLineNumber = (lineNumber) => {
          dispatch({
            type: MarkdownContextReducerActionType.SetSlideshowLineNumber,
            slideshowLineNumber: lineNumber,
          });
        };

        R.pipe(
          R.values,
          R.find(isTopElement),
          R.either(R.isNil, R.pipe(getLineNumber, setLineNumber))
        )(entries);
      }, 100),
    [dispatch, entries]
  );

  /* Adds/Removes event listener on 'scroll' depending on pane `isActive` */
  useEffect(() => {
    isActive
      ? node?.addEventListener("scroll", handleScroll, { passive: true })
      : node?.removeEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [isActive, handleScroll, node]);
};
