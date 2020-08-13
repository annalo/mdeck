import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  markdown: string;
  handleTextChange(value: string): void;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
`;

const TextArea = styled.textarea`
  height: 100%;
  resize: none;
`;

export const TextEditor: React.FC<Props> = memo(
  ({ markdown, handleTextChange }: Props) => {
    return (
      <Container>
        <TextArea
          onChange={(e): void => handleTextChange(e.target.value)}
          value={markdown}
        />
      </Container>
    );
  }
);
