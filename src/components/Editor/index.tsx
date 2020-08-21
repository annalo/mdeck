import React, { memo, useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { MarkdownProvider } from "contexts/MarkdownContext";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [html, setHtml] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<number>(0);

  return (
    <Container>
      <MarkdownProvider>
        <TextEditor />
        <Preview html={html} setLineNumber={setLineNumber} />
      </MarkdownProvider>
    </Container>
  );
};

export default memo(Editor);
