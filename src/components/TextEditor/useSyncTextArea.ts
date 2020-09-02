import { useEffect } from "react";
import type { RefObject } from "react";
import * as R from "ramda";

interface UseSyncTextAreaProps {
  ref: RefObject<HTMLTextAreaElement>;
  slideshowLineNumber: number;
  textAreaLineHeight: number;
}

export const useSyncTextArea = ({
  ref,
  slideshowLineNumber,
  textAreaLineHeight,
}: UseSyncTextAreaProps): void => {
  /* Syncs text when slideshowLineNumber changes */
  useEffect(() => {
    const getNode = R.prop("current");
    const scrollTop = R.multiply(textAreaLineHeight, slideshowLineNumber);
    // TODO smooth scrolling
    const setScrollTop = R.curry((value, n) => {
      n.scrollTop = value; // eslint-disable-line no-param-reassign
    });

    R.pipe(getNode, R.unless(R.isNil, setScrollTop(scrollTop)))(ref);
  }, [ref, slideshowLineNumber, textAreaLineHeight]);
};
