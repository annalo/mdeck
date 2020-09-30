import { useEffect, useMemo } from "react";
import * as R from "ramda";
import throttle from "lodash/throttle";

import {
  MarkdownContextReducerAction,
  MarkdownContextReducerActionType,
} from "types/markdown-context-reducer-action";

interface useTrackEditorScrollProps {
  dispatch: React.Dispatch<MarkdownContextReducerAction>;
  isActive: boolean;
  ref: React.RefObject<HTMLTextAreaElement>;
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
        const calculateLine = R.divide(R.__, textAreaLineHeight);
        const editorLine = R.pipe(getScrollTop, calculateLine, Math.floor)(ev);

        dispatch({
          type: MarkdownContextReducerActionType.SetEditorLine,
          editorLine,
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
