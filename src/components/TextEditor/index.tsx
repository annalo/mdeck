import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  markdown: string;
  handleTextChange(value: string): void;
}

const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  background-color: transparent;
  outline: none;
  height: 100%;
  resize: none;
`;

export const TextEditor: React.FC<Props> = memo(
  ({ markdown, handleTextChange }: Props) => {
    return (
      <Container>
        <TextArea
          autoFocus
          onChange={(e): void => handleTextChange(e.target.value)}
          value={markdown}
        />
      </Container>
    );
  }
);
