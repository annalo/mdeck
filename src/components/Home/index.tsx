import React from "react";
import styled from "styled-components";

import { MarkdownContextProvider } from "contexts/MarkdownContext";

import { Toolbar } from "components/Toolbar/Loadable";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { Editor } from "components/Editor/Loadable";
import { Preview } from "components/Preview/Loadable";

const Container = styled.div`
  height: 100%;
`;
const Body = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: ${(props) => props.theme.toolbarHeight + 2}px;
`;

const Home: React.FC = () => (
  <Container id="main">
    <MarkdownContextProvider>
      <SlideObserverProvider>
        <CodeLineObserverProvider>
          <Body>
            <Editor />
            <Preview />
          </Body>

          <Toolbar />
        </CodeLineObserverProvider>
      </SlideObserverProvider>
    </MarkdownContextProvider>
  </Container>
);

export { Home };
