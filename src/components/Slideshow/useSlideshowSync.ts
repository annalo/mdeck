import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import * as R from "ramda";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import throttle from "lodash/throttle";

import { usePaneIsActive } from "utils/usePaneIsActive";

interface UseSlideshowSyncProps {
  dispatch: Dispatch<any>;
  entries: Array<HTMLElement | SVGSVGElement>;
  ref: RefObject<HTMLDivElement>;
  textLineNumber: number;
}

export const useSlideshowSync = ({
  dispatch,
  entries,
  ref,
  textLineNumber,
}: UseSlideshowSyncProps): void => {
  const node = ref.current;
  const isActive = usePaneIsActive(ref, false);

  /*
   * From the list of elements registerd with the observer (SlideshowObserver),
   * finds the top most element in view (within 0px - 18px from the top)
   * IF element THEN set `slideshowLineNumber` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const withinTopBounds = R.both(R.gte(R.__, 0), R.lte(R.__, 18));
        const isTopElement = (entry) =>
          withinTopBounds(entry.getBoundingClientRect().top);

        const getLineNumber = R.pipe(R.path(["dataset", "line"]), parseInt);
        const setLineNumber = (lineNumber) => {
          dispatch({
            type: "setSlideshowLineNumber",
            slideshowLineNumber: lineNumber,
          });
        };

        R.pipe(
          R.find(isTopElement),
          R.either(R.isNil, R.pipe(getLineNumber, setLineNumber))
        )(entries);
      }, 100),
    [dispatch, entries]
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

  /* Syncs slideshow when textLineNumber changes */
  useEffect(() => {
    const matchingElement = R.find(
      R.pathEq(["dataset", "line"], `${textLineNumber}`),
      entries
    );
    const scrollTo = (element) => scrollIntoView(element, { block: "start" });

    R.either(R.isNil, scrollTo)(matchingElement);
  }, [entries, handleScroll, node, textLineNumber]);
};
