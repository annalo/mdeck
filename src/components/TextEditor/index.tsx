import React, { memo, useContext, useEffect, useRef } from "react";
import styled from "styled-components/macro";

import { MarkdownContext } from "contexts/MarkdownContext";
import { useHover } from "./useHover";
import { useCurrentSrcLine } from "./useCurrentSrcLine";

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

function lineCount(text: string): number {
  return text.split("\n").length;
}

export const TextEditor: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { lineNumber, md } = state;
  const isHovered = useHover(ref);

  useCurrentSrcLine(ref, dispatch);
  console.log(lineNumber);

  useEffect(() => {
    if (isHovered) return;

    const node = ref.current;
    if (node) {
      // sync text to preview
      const { scrollHeight, value } = node;
      node.scroll({
        top: (lineNumber / lineCount(value)) * scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isHovered, lineNumber]);

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
