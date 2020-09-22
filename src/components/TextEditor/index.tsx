import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { MarkdownContextReducerActionType } from "types/markdown-context-reducer-action";

import { usePaneIsActive } from "utils/usePaneIsActive";

import { TEXT_AREA_LINE_HEIGHT, TextArea } from "./TextArea";
import { useSyncTextArea } from "./useSyncTextArea";
import { useTrackTextAreaScroll } from "./useTrackTextAreaScroll";

const Container = styled.div`
  background-color: ${(props) => props.theme.textAreaBackgroundColor};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TextEditor = memo(function TextEditor() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useMarkdownDispatch();
  const { md, slideshowLineNumber } = useMarkdownState();

  const isActive = usePaneIsActive({ ref, initialValue: true });

  useSyncTextArea({
    ref,
    slideshowLineNumber,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });
  useTrackTextAreaScroll({
    dispatch,
    isActive,
    ref,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });

  const handleInputChange = (e) => {
    dispatch({
      type: MarkdownContextReducerActionType.SetMd,
      md: e.target.value,
    });
  };
  const handleKeyDown = (e) => {
    // support tabs
    if (e.keyCode === 9) {
      const { target } = e;
      const val = target.value;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      target.value = `${val.substring(0, start)}\t${val.substring(end)}`;
      target.selectionStart = target.selectionEnd = start + 1; // eslint-disable-line no-multi-assign

      e.preventDefault();
    }
  };

  return (
    <Container>
      <TextArea
        ref={ref}
        autoFocus
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={md}
      />
    </Container>
  );
});

export { TEXT_AREA_LINE_HEIGHT, TextEditor };
