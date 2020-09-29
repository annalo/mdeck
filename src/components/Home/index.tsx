import React, { useRef } from "react";
import styled from "styled-components";

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

const Home: React.FC = () => {
  const slideshowRef = useRef<HTMLElement>(null);

  return (
    <Body id="main">
      <Container>
        <Editor />
        <Preview ref={slideshowRef} />
      </Container>

      <Toolbar />
    </Body>
  );
};

export { Home };
