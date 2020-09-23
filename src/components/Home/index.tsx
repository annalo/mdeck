import React from "react";
import styled from "styled-components";

import { MarkdownProvider } from "contexts/MarkdownContext";

import { Toolbar } from "components/Toolbar/Loadable";
import { Editor } from "components/Editor/Loadable";
import { ThemeProvider } from "./ThemeProvider";

const Container = styled.div`
  height: 100%;
`;

const Home: React.FC = () => (
  <ThemeProvider>
    <Container id="main">
      <MarkdownProvider>
        <Editor />

        <Toolbar />
      </MarkdownProvider>
    </Container>
  </ThemeProvider>
);

export { Home };
