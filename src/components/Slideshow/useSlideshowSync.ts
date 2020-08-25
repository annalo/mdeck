import { useCallback, useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import * as R from "ramda";

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

  /*
   * From the list of elements registerd with the observer (SlideshowContext),
   * finds the top most element in view (within 0px - 18px from the top)
   * IF element THEN set `slideshowLineNumber` to it's data-line number
   */
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        console.log("set slideshow line");

        const isTopElement = (entry) => {
          const boundingClientTop = entry.getBoundingClientRect().top;
          return boundingClientTop >= 0 && boundingClientTop <= 18;
        };
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

  /* Initializes event listener on "scroll" */
  useEffect(() => {
    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, node]);

  /* Syncs slideshow when textLineNumber changes */
  useEffect(() => {
    const matchingElement = R.find(
      R.pathEq(["dataset", "line"], `${textLineNumber}`),
      entries
    );

    async function scrollTo(element) {
      console.log("sync slideshow to text");
      node?.removeEventListener("scroll", handleScroll);

      await scrollIntoView(element, { block: "start" });
      return node?.addEventListener("scroll", handleScroll);
    }

    // const scrollTo = debounce((element) => {
    //   console.log("sync slideshow to text");
    //   node?.removeEventListener("scroll", handleScroll);

    //   Promise.resolve(scrollIntoView(element, { block: "start" })).then(() =>
    //     node?.addEventListener("scroll", handleScroll)
    //   );
    // }, 100);

    R.either(R.isNil, scrollTo)(matchingElement);
  }, [entries, handleScroll, node, textLineNumber]);
}
