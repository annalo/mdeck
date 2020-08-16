import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  src: string;
  handleTextChange(value: string): void;
  setLineNumber(value: number): void;
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

export const TextEditor: React.FC<Props> = memo(
  ({ src, handleTextChange, setLineNumber }: Props) => {
    function handleScroll(e: React.UIEvent<HTMLTextAreaElement>): void {
      const {
        value,
        scrollHeight,
        scrollTop,
      } = e.target as HTMLTextAreaElement;
      const lineCount = value.split("\n").length;
      // The line number at the top of the textarea can be calculated by multiplying
      //  the line height (total line count / entire height of element)by scrollTop.
      const currentLineNumber = Math.floor(
        (lineCount / scrollHeight) * scrollTop
      );

      setLineNumber(currentLineNumber);
    }

    return (
      <Container>
        <TextArea
          autoFocus
          onChange={(e): void => handleTextChange(e.target.value)}
          onScroll={handleScroll}
          value={src}
        />
      </Container>
    );
  }
);
