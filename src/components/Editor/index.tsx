import React, { memo } from "react";
import styled from "styled-components";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { MarkdownContextProvider } from "contexts/MarkdownContext2";

const Div = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => (
  <Div>
    <MarkdownContextProvider>
      <TextEditor />
      <Preview />
    </MarkdownContextProvider>
  </Div>
);

export default memo(Editor);
