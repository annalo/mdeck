import React, { useRef } from "react";
import styled from "styled-components";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { PresentationContextProvider } from "contexts/PresentationContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

import { Editor } from "components/Editor/Loadable";
import { Preview } from "components/Preview";
import { Toolbar } from "components/Toolbar/Loadable";

const Body = styled.div`
  height: 100%;
`;
const Container = styled.div`
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

const Home: React.FC = () => {
  const slideshowRef = useRef<HTMLElement>(null);

  return (
    <Body id="main">
      <ContextProviders>
        <Container>
          <Editor />
          <Preview ref={slideshowRef} />
        </Container>

        <Toolbar />
      </ContextProviders>
    </Body>
  );
};

export { Home };
