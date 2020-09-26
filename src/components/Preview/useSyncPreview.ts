import { useEffect } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

interface UseSyncSlideshowProps {
  entries: SlideshowObserver.Entries;
  textLineNumber: LineNumber;
}

function useSyncPreview({
  entries,
  textLineNumber,
}: UseSyncSlideshowProps): void {
  /* Syncs slideshow when textLineNumber changes */
  useEffect(() => {
    const dataLineElement = entries[textLineNumber];
    if (dataLineElement) scrollIntoView(dataLineElement, { block: "start" });
  }, [entries, textLineNumber]);
}

export { useSyncPreview };
