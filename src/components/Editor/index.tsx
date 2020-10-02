import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { MarkdownContextReducerActionType } from "types/markdown-context-reducer-action";

import { usePaneIsActive } from "utils/usePaneIsActive";

import { TEXT_AREA_LINE_HEIGHT, TextArea } from "./TextArea";
import { useSyncEditor } from "./useSyncEditor";
import { useTrackEditorScroll } from "./useTrackEditorScroll";

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
`;

const Editor = memo(function Editor() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const dispatch = useMarkdownDispatch();
  const { md, previewCodeLine } = useMarkdownState();

  const isActive = usePaneIsActive({ ref, initialValue: true });

  useSyncEditor({
    ref,
    previewCodeLine,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });
  useTrackEditorScroll({
    dispatch,
    isActive,
    ref,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });

  const handleInputChange = (ev) => {
    dispatch({
      type: MarkdownContextReducerActionType.SetMd,
      md: ev.target.value,
    });
  };
  const handleKeyDown = (ev) => {
    // support tabs
    if (ev.keyCode === 9) {
      const { target } = ev;
      const val = target.value;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      target.value = `${val.substring(0, start)}\t${val.substring(end)}`;
      target.selectionStart = target.selectionEnd = start + 1; // eslint-disable-line no-multi-assign

      ev.preventDefault();
    }
  };

  return (
    <Column id="editor">
      <TextArea
        ref={ref}
        autoFocus
        id="md-textarea"
        name="md"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={md}
      />
    </Column>
  );
});

export { TEXT_AREA_LINE_HEIGHT, Editor };
