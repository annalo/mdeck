import { useEffect, useMemo } from "react";
import type { Dispatch, RefObject } from "react";
import throttle from "lodash/throttle";
import * as R from "ramda";

interface UseSlideshowSyncProps {
  dispatch: Dispatch<any>;
  entries: Array<HTMLElement | SVGSVGElement>;
  ref: RefObject<HTMLDivElement>;
}

export function useSync({
  dispatch,
  entries,
  ref,
}: UseSlideshowSyncProps): void {
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const isTopElement = (entry) => {
          const boundingClientTop = entry.getBoundingClientRect().top;
          return boundingClientTop >= 0 && boundingClientTop <= 18;
        };
        const topElement = R.find(isTopElement, entries);

        const setLineNumber = (entry) => {
          const lineNumber = parseInt(R.path(["dataset", "line"], entry), 10);
          dispatch({
            type: "setPreviewLineNumber",
            previewLineNumber: lineNumber,
          });
        };

        R.either(R.isNil, setLineNumber)(topElement);
      }, 100),
    [dispatch, entries]
  );

  useEffect(() => {
    const node = ref.current;

    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, ref]);
}
