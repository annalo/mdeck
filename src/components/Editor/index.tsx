import React, { memo } from "react";
import styled from "styled-components";

import { MarkdownProvider } from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Div = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = memo(function Editor() {
  return (
    <Div>
      <MarkdownProvider>
        <TextEditor />
        <SlideObserverProvider>
          <CodeLineObserverProvider>
            <Preview />
          </CodeLineObserverProvider>
        </SlideObserverProvider>
      </MarkdownProvider>
    </Div>
  );
});

export { Editor };
