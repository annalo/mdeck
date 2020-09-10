import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { MarkdownContextReducerActionType } from "types/markdown-context";

import { usePaneIsActive } from "utils/usePaneIsActive";
import { useSyncTextArea } from "./useSyncTextArea";
import { useTrackTextAreaScroll } from "./useTrackTextAreaScroll";

export const TEXT_AREA_LINE_HEIGHT = 18;

const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  background-color: transparent;
  border: none;
  font-size: 15px;
  height: 100%;
  line-height: ${TEXT_AREA_LINE_HEIGHT}px;
  outline: none;
  padding: 1em;
  resize: none;
`;

export const TextEditor: React.FC = () => {
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

  return (
    <Container>
      <TextArea ref={ref} autoFocus onChange={handleInputChange} value={md} />
    </Container>
  );
};

export default memo(TextEditor);
