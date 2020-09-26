import { useEffect } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

interface UseSyncPreviewProps {
  entries: SlideshowObserver.Entries;
  editorLine: LineNumber;
}

function useSyncPreview({ entries, editorLine }: UseSyncPreviewProps): void {
  /* Syncs preview when editorLine changes */
  useEffect(() => {
    const dataLineElement = entries[editorLine];
    if (dataLineElement) scrollIntoView(dataLineElement, { block: "start" });
  }, [entries, editorLine]);
}

export { useSyncPreview };
