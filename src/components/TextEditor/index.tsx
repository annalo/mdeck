import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components/macro";

interface Props {
  src: string;
  handleTextChange(value: string): void;
  lineNumber: number;
}

const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 1.5em 1.5em;
  border: none;
  background-color: transparent;
  outline: none;
  height: 100%;
  resize: none;
`;

function lineCount(text: string): number {
  return text.split("\n").length;
}

export const TextEditor: React.FC<Props> = ({
  src,
  handleTextChange,
  lineNumber,
}: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // sync text to preview
    const node = ref.current;
    if (node) {
      const { scrollHeight, value } = node;
      node.scroll({
        top: (lineNumber / lineCount(value)) * scrollHeight,
        behavior: "smooth",
      });
    }
  });

  return (
    <Container>
      <TextArea
        ref={ref}
        autoFocus
        onChange={(e): void => handleTextChange(e.target.value)}
        value={src}
      />
    </Container>
  );
};

export default memo(TextEditor);
