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

const Container = styled.div`
  background-color: ${(props) => props.theme.editorBackgroundColor};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Editor = memo(function Editor() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useMarkdownDispatch();
  const { md, slideshowLineNumber } = useMarkdownState();

  const isActive = usePaneIsActive({ ref, initialValue: true });

  useSyncEditor({
    ref,
    slideshowLineNumber,
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
    <Container>
      <TextArea
        ref={ref}
        autoFocus
        name="md"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={md}
      />
    </Container>
  );
});

export { TEXT_AREA_LINE_HEIGHT, Editor };
