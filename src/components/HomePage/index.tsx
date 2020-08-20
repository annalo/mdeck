import React from "react";
import styled from "styled-components/macro";

import { Editor } from "components/Editor/Loadable";

const Div = styled.div`
  height: 100%;
`;

export const HomePage: React.FC = () => (
  <Div className="main">
    <Editor />
  </Div>
);
