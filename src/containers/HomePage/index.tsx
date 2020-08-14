import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import { Editor } from "containers/Editor/Loadable";

const Div = styled.div`
  height: 100%;
`;

export const HomePage: React.FC = () => (
  <>
    <Helmet>
      <title>Home Page</title>
      <meta
        content="A minimal, markdown-based presentation tool."
        name="description"
      />
    </Helmet>
    <Div>
      <Editor />
    </Div>
  </>
);
