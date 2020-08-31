import React, { memo, useContext, useRef } from "react";
import styled from "styled-components";

import { MarkdownContext } from "contexts/MarkdownContext";

import { useTrackTextAreaScroll } from "./useTrackTextAreaScroll";
import { useSyncTextArea } from "./useSyncTextArea";

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
  const { state, dispatch } = useContext(MarkdownContext);
  const { md, slideshowLineNumber } = state;

  useTrackTextAreaScroll({
    dispatch,
    ref,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });
  useSyncTextArea({
    ref,
    slideshowLineNumber,
    textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
  });

  const handleInputChange = (e) =>
    dispatch({ type: "setMd", md: e.target.value });

  return (
    <Container>
      <TextArea ref={ref} autoFocus onChange={handleInputChange} value={md} />
    </Container>
  );
};

export default memo(TextEditor);
