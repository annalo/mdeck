import { useEffect } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

interface UseSyncPreviewProps {
  entries: SlideshowObserver.Entries;
  textLineNumber: LineNumber;
}

function useSyncPreview({
  entries,
  textLineNumber,
}: UseSyncPreviewProps): void {
  /* Syncs preview when textLineNumber changes */
  useEffect(() => {
    const dataLineElement = entries[textLineNumber];
    if (dataLineElement) scrollIntoView(dataLineElement, { block: "start" });
  }, [entries, textLineNumber]);
}

export { useSyncPreview };
