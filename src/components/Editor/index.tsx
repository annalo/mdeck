import React, { memo } from "react";
import styled from "styled-components";

import { MarkdownProvider } from "contexts/MarkdownContext";

import { Toolbar } from "components/Toolbar/Loadable";
import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Body = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: ${(props) => props.theme.toolbarHeight + 2}px;
`;

const Editor = memo(function Editor() {
  return (
    <>
      <Body>
        <MarkdownProvider>
          <TextEditor />
          <Preview />
        </MarkdownProvider>
      </Body>

      <Toolbar />
    </>
  );
});

export { Editor };
