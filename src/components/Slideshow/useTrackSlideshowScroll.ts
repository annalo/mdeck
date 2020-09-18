import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import type { Dispatch } from "react";
import {
  MarkdownContextReducerAction,
  MarkdownContextReducerActionType,
} from "types/markdown-context-reducer-action";

import { NAVBAR_HEIGHT } from "components/Toolbar/Navbar";
import { TEXT_AREA_LINE_HEIGHT } from "components/TextEditor";

interface UseTrackSlideshowScrollProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  entries: SlideshowObserver.Entries;
  isActive: boolean;
  ref: any;
}

function useTrackSlideshowScroll({
  dispatch,
  entries,
  isActive,
  ref,
}: UseTrackSlideshowScrollProps): void {
  /*
   * Finds the top most element in view (within 0px - 36px from the top)
   * IF element THEN set `slideshowLineNumber` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const topBounds = R.add(NAVBAR_HEIGHT, TEXT_AREA_LINE_HEIGHT);
        const withinBounds = R.both(R.gte(R.__, 0), R.lte(R.__, topBounds));
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
}

export { useTrackSlideshowScroll };
