import { useEffect } from "react";
import * as R from "ramda";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

interface UseSyncSlideshowProps {
  entries: SlideshowObserver.Entries;
  textLineNumber: LineNumber;
}

export const useSyncSlideshow = ({
  entries,
  textLineNumber,
}: UseSyncSlideshowProps): void => {
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
  }, [entries, textLineNumber]);
};
