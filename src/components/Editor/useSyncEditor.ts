import { useEffect } from "react";
import type { RefObject } from "react";
import * as R from "ramda";

interface useSyncEditorProps {
  ref: RefObject<HTMLTextAreaElement>;
  previewCodeLine: LineNumber;
  textAreaLineHeight: LineNumber;
}

function useSyncEditor({
  ref,
  previewCodeLine,
  textAreaLineHeight,
}: useSyncEditorProps): void {
  /* Syncs text when previewCodeLine changes */
  useEffect(() => {
    const getNode = R.prop("current");
    const calculateScrollTop = R.multiply(textAreaLineHeight, previewCodeLine);
    // TODO smooth scrolling
    const setScrollTop = R.curry((scrollTop, n) => {
      n.scrollTop = scrollTop; // eslint-disable-line no-param-reassign
    });

    R.pipe(getNode, R.unless(R.isNil, setScrollTop(calculateScrollTop)))(ref);
  }, [ref, previewCodeLine, textAreaLineHeight]);
}

export { useSyncEditor };
