import React from "react";
import styled from "styled-components";

import { Editor } from "components/Editor/Loadable";

const Div = styled.div`
  height: 100%;
`;

export const Home: React.FC = () => (
  <Div id="main">
    <Editor />
  </Div>
);
