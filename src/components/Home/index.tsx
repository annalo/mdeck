import React from "react";
import styled from "styled-components";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { PresentationContextProvider } from "contexts/PresentationContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { Editor } from "components/Editor/Loadable";
import { Preview } from "components/Preview/Loadable";
import { Toolbar } from "components/Toolbar/Loadable";

const Container = styled.div`
  height: 100%;
`;
const Body = styled.body`
  display: flex;
  height: 100%;
  padding-bottom: ${(props) => props.theme.toolbarHeight + 2}px;
`;

const ContextProviders = ({ children }) => (
  <MarkdownContextProvider>
    <PresentationContextProvider>
      <SlideObserverProvider>
        <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
      </SlideObserverProvider>
    </PresentationContextProvider>
  </MarkdownContextProvider>
);

const Home: React.FC = () => (
  <Container id="main">
    <ContextProviders>
      <Body>
        <Editor />
        <Preview />
      </Body>

      <Toolbar />
    </ContextProviders>
  </Container>
);

export { Home };
