import { useEffect } from "react";
import type { RefObject } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

// import {
//   CODE_LINE_CLASS_NAME,
//   DATA_LINE_ATTRIBUTE,
// } from "utils/parsePlugins/injectLineNumber";

interface UseSyncSlideshowProps {
  entries: SlideshowObserver.Entries;
  ref: RefObject<HTMLDivElement>;
  textLineNumber: LineNumber;
}

export const useSyncSlideshow = ({
  entries,
  ref,
  textLineNumber,
}: UseSyncSlideshowProps): void => {
  /* Syncs slideshow when textLineNumber changes */
  useEffect(() => {
    // console.log(textLineNumber);
    // const dataLineElement = ref.current?.querySelector(
    //   `[${DATA_LINE_ATTRIBUTE}="${textLineNumber}"]`
    // );
    // if (dataLineElement) scrollIntoView(dataLineElement, { block: "start" });
    const dataLineElement = entries[textLineNumber];
    if (dataLineElement) scrollIntoView(dataLineElement, { block: "start" });
  }, [entries, ref, textLineNumber]);
};
