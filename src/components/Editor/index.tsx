import React, { memo } from "react";
import styled from "styled-components";

import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Div = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: ${(props) => props.theme.toolbarHeight + 2}px;
`;

const Editor = memo(function Editor() {
  return (
    <Div>
      <TextEditor />

      <SlideObserverProvider>
        <CodeLineObserverProvider>
          <Preview />
        </CodeLineObserverProvider>
      </SlideObserverProvider>
    </Div>
  );
});

export { Editor };
