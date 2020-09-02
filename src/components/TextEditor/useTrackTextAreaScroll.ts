import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import { usePaneIsActive } from "utils/usePaneIsActive";

interface UseTrackTextAreaScrollProps {
  dispatch: Dispatch<any>;
  ref: RefObject<HTMLTextAreaElement>;
  textAreaLineHeight: number;
}

export const useTrackTextAreaScroll = ({
  dispatch,
  ref,
  textAreaLineHeight,
}: UseTrackTextAreaScrollProps): void => {
  const isActive = usePaneIsActive({ ref, initialValue: true });

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
};
