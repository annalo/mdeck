import { useEffect } from "react";
import type { RefObject } from "react";
import * as R from "ramda";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

interface UseSyncSlideshowProps {
  entries: Array<Element>;
  ref: RefObject<HTMLDivElement>;
  textLineNumber: number;
}

export const useSyncSlideshow = ({
  entries,
  ref,
  textLineNumber,
}: UseSyncSlideshowProps): void => {
  const node = ref.current;

  /* Syncs slideshow when textLineNumber changes */
  useEffect(() => {
    const isMatchingElement = R.pathEq(
      ["dataset", "line"],
      `${textLineNumber}`
    );
    const scrollToElement = (e) => scrollIntoView(e, { block: "start" });

    R.pipe(
      R.find(isMatchingElement),
      R.unless(R.isNil, scrollToElement)
    )(entries);
  }, [entries, node, textLineNumber]);
};
