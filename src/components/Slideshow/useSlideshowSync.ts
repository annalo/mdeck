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

export function useSlideshowSync({
  dispatch,
  entries,
  ref,
  textLineNumber,
}: UseSlideshowSyncProps): void {
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
        const isTopElement = (entry) =>
          R.both(
            R.gte(R.__, 0),
            R.lte(R.__, 18)
          )(entry.getBoundingClientRect().top);
        const topElement = R.find(isTopElement, entries);

        const setLineNumber = (element) => {
          const lineNumber = parseInt(R.path(["dataset", "line"], element), 10);
          dispatch({
            type: "setSlideshowLineNumber",
            slideshowLineNumber: lineNumber,
          });
        };

        R.either(R.isNil, setLineNumber)(topElement);
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
}
