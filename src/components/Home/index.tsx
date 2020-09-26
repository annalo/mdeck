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

const ContextProviderWrapper = ({ children }) => (
  <MarkdownContextProvider>
    <SlideObserverProvider>
      <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
    </SlideObserverProvider>
  </MarkdownContextProvider>
);

const Home: React.FC = () => (
  <Container id="main">
    <ContextProviderWrapper>
      <Body>
        <Editor />
        <Preview />
      </Body>

      <Toolbar />
    </ContextProviderWrapper>
  </Container>
);

export { Home };
