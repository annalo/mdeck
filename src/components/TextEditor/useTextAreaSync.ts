import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import { usePaneIsActive } from "utils/usePaneIsActive";

interface UseTextAreaSyncProps {
  dispatch: Dispatch<any>;
  ref: RefObject<HTMLTextAreaElement>;
  slideshowLineNumber: number;
  textAreaLineHeight: number;
}

export const useTextAreaSync = ({
  dispatch,
  ref,
  slideshowLineNumber,
  textAreaLineHeight,
}: UseTextAreaSyncProps): void => {
  const isActive = usePaneIsActive(ref, true);

  const handleScroll = useMemo(
    () =>
      throttle((e) => {
        const getScrollTop = R.path(["target", "scrollTop"]);
        const calculateLineNumber = R.divide(R.__, textAreaLineHeight);
        const textLineNumber = R.pipe(
          getScrollTop,
          calculateLineNumber,
          Math.floor
        )(e);

        dispatch({ type: "setTextLineNumber", textLineNumber });
      }, 200),
    [dispatch, textAreaLineHeight]
  );

  /* Adds/Removes event listener on 'scroll' depending on pane `isActive` */
  useEffect(() => {
    const node = ref.current;

    isActive
      ? node?.addEventListener("scroll", handleScroll, { passive: true })
      : node?.removeEventListener("scroll", handleScroll);

    return () => node?.removeEventListener("scroll", handleScroll);
  }, [isActive, handleScroll, ref]);

  /* Syncs text when slideshowLineNumber changes */
  useEffect(() => {
    const getNode = R.prop("current");
    const scrollTop = R.multiply(textAreaLineHeight, slideshowLineNumber);
    // TODO smooth scrolling
    const setScrollTop = R.curry((value, n) => {
      n.scrollTop = value; // eslint-disable-line no-param-reassign
    });

    R.pipe(getNode, R.either(R.isNil, setScrollTop(scrollTop)))(ref);
  }, [ref, slideshowLineNumber, textAreaLineHeight]);
};
