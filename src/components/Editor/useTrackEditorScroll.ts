import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import type { Dispatch, RefObject } from "react";
import {
  MarkdownContextReducerAction,
  MarkdownContextReducerActionType,
} from "types/markdown-context-reducer-action";

interface useTrackEditorScrollProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  isActive: boolean;
  ref: RefObject<HTMLTextAreaElement>;
  textAreaLineHeight: number;
}

function useTrackEditorScroll({
  dispatch,
  isActive,
  ref,
  textAreaLineHeight,
}: useTrackEditorScrollProps): void {
  const handleScroll = useMemo(
    () =>
      throttle((ev) => {
        const getScrollTop = R.path(["target", "scrollTop"]);
        const calculateLineNumber = R.divide(R.__, textAreaLineHeight);
        const textLineNumber = R.pipe(
          getScrollTop,
          calculateLineNumber,
          Math.floor
        )(ev);

        dispatch({
          type: MarkdownContextReducerActionType.SetTextLineNumber,
          textLineNumber,
        });
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
}

export { useTrackEditorScroll };
