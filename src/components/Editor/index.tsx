import React, { memo } from "react";
import styled from "styled-components";

import { MarkdownProvider } from "contexts/MarkdownContext";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Div = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => (
  <Div>
    <MarkdownProvider>
      <TextEditor />
      <Preview />
    </MarkdownProvider>
  </Div>
);

export default memo(Editor);
