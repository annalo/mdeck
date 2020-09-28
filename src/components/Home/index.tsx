import React from "react";
import styled from "styled-components";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { PresentationContextProvider } from "contexts/PresentationContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { Editor } from "components/Editor/Loadable";
import { Preview } from "components/Preview/Loadable";
import { Toolbar } from "components/Toolbar/Loadable";

const Body = styled.div`
  height: 100%;
`;
const Container = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: ${(props) => props.theme.toolbarHeight + 2}px;
`;
const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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
  <Body id="main">
    <ContextProviders>
      <Container>
        <Column>
          <Editor />
        </Column>
        <Column>
          <Preview />
        </Column>
      </Container>

      <Toolbar />
    </ContextProviders>
  </Body>
);

export { Home };
