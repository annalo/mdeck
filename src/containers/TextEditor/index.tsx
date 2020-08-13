import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  markdown: string;
  setMarkdown(value: string): void;
}

const TextArea = styled.textarea`
  height: 50%;
`;

export const TextEditor: React.FC<Props> = memo(
  ({ markdown, setMarkdown }: Props) => {
    return (
      <TextArea
        onChange={(e): void => setMarkdown(e.target.value)}
        value={markdown}
      />
    );
  }
);
