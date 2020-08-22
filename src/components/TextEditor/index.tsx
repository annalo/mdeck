// TODO cleanup
import React, { memo, useContext, useRef } from "react";
import styled from "styled-components/macro";

import { MarkdownContext } from "contexts/MarkdownContext";
import { useActivePane } from "utils/useActivePane";
import { useLineNumberOnScroll } from "./useLineNumberOnScroll";
import { useSync } from "./useSync";

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
  outline: none;
  padding: 1em;
  resize: none;
`;

export const TextEditor: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { activePane, lineNumber, md } = state;

  useActivePane({ paneName: "text", ref });
  useSync({ dispatch, isActive: activePane === "text", lineNumber, ref });
  console.log(lineNumber);

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
