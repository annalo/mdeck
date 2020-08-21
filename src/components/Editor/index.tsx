import React, { memo } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { MarkdownProvider } from "contexts/MarkdownContext";

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
