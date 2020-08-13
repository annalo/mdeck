import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  markdown: string;
  setMarkdown(value: string): void;
}

export const TextEditor = memo(({ markdown, setMarkdown }: Props) => {
  return (
    <Div>
      <textarea
        onChange={(e) => setMarkdown(e.target.value)}
        value={markdown}
      />
    </Div>
  );
});

const Div = styled.div``;

export default TextEditor;
