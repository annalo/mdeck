import { useEffect } from "react";
import type { RefObject } from "react";
import * as R from "ramda";

interface useSyncEditorProps {
  ref: RefObject<HTMLTextAreaElement>;
  slideshowLineNumber: LineNumber;
  textAreaLineHeight: LineNumber;
}

function useSyncEditor({
  ref,
  slideshowLineNumber,
  textAreaLineHeight,
}: useSyncEditorProps): void {
  /* Syncs text when slideshowLineNumber changes */
  useEffect(() => {
    const getNode = R.prop("current");
    const calculateScrollTop = R.multiply(
      textAreaLineHeight,
      slideshowLineNumber
    );
    // TODO smooth scrolling
    const setScrollTop = R.curry((scrollTop, n) => {
      n.scrollTop = scrollTop; // eslint-disable-line no-param-reassign
    });

    R.pipe(getNode, R.unless(R.isNil, setScrollTop(calculateScrollTop)))(ref);
  }, [ref, slideshowLineNumber, textAreaLineHeight]);
}

export { useSyncEditor };
