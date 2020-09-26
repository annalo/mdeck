import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import type { Dispatch } from "react";
import {
  MarkdownContextReducerAction,
  MarkdownContextReducerActionType,
} from "types/markdown-context-reducer-action";

import { TEXT_AREA_LINE_HEIGHT } from "components/Editor/TextArea";

interface UseTrackPreviewScrollProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  entries: SlideshowObserver.Entries;
  isActive: boolean;
  ref: any;
}

function useTrackPreviewScroll({
  dispatch,
  entries,
  isActive,
  ref,
}: UseTrackPreviewScrollProps): void {
  /*
   * Finds the top most element in view (within 0px - 18px from the top)
   * IF element THEN set `previewCodeLine` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const withinBounds = R.both(
          R.gte(R.__, 0),
          R.lte(R.__, TEXT_AREA_LINE_HEIGHT)
        );
        const isTopElement = (e) => withinBounds(e.getBoundingClientRect().top);
        const setPreviewCodeLine = (line) =>
          dispatch({
            type: MarkdownContextReducerActionType.SetPreviewCodeLine,
            previewCodeLine: line,
          });

        const topElement = Object.entries(entries).find(([, entry]) =>
          isTopElement(entry)
        );
        if (topElement) setPreviewCodeLine(parseInt(topElement[0], 10));
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

export { useTrackPreviewScroll };
