import React, { memo, useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { MarkdownProvider } from "contexts/MarkdownContext";

const Div = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [html, setHtml] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<number>(0);

  return (
    <Div>
      <MarkdownProvider>
        <TextEditor />
        <Preview html={html} setLineNumber={setLineNumber} />
      </MarkdownProvider>
    </Div>
  );
};

export default memo(Editor);
