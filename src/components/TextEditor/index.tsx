import React, { memo, useContext, useRef } from "react";
import styled from "styled-components/macro";
import { MarkdownContext } from "contexts/MarkdownContext";
import { useSync } from "components/TextEditor/useSync";

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
  const { md, previewLineNumber } = state;

  useSync({ dispatch, previewLineNumber, ref });

  return (
    <Container>
      <TextArea
        ref={ref}
        autoFocus
        onChange={(e): void => dispatch({ type: "setMd", md: e.target.value })}
        value={md}
      />
    </Container>
  );
};

export default memo(TextEditor);
