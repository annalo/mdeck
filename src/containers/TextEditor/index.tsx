import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  markdown: string;
  setMarkdown(value: string): void;
}

export const TextEditor = memo(({ markdown, setMarkdown }: Props) => {
  return (
    <TextArea onChange={(e) => setMarkdown(e.target.value)} value={markdown} />
  );
});

const TextArea = styled.textarea`
  height: 100%;
`;

export default TextEditor;
