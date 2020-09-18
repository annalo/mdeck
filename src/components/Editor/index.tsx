import React, { memo } from "react";
import styled from "styled-components";

import { MarkdownProvider } from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { NAVBAR_HEIGHT } from "components/Toolbar/Navbar";
import { Toolbar } from "components/Toolbar/Loadable";
import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Container = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: ${NAVBAR_HEIGHT + 2}px;
`;

const Editor = memo(function Editor() {
  return (
    <>
      <Container>
        <MarkdownProvider>
          <TextEditor />

          <SlideObserverProvider>
            <CodeLineObserverProvider>
              <Preview />
            </CodeLineObserverProvider>
          </SlideObserverProvider>
        </MarkdownProvider>
      </Container>

      <Toolbar />
    </>
  );
});

export { Editor };
