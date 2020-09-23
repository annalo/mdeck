import React from "react";
import styled from "styled-components";

import { Toolbar } from "components/Toolbar/Loadable";
import { Editor } from "components/Editor/Loadable";
import { ThemeProvider } from "./ThemeProvider";

const Div = styled.div`
  height: 100%;
`;

const Home: React.FC = () => (
  <ThemeProvider>
    <Div id="main">
      <Editor />
      <Toolbar />
    </Div>
  </ThemeProvider>
);

export { Home };
