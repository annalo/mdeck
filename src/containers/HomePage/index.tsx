import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import { TextEditor } from "containers/TextEditor/Loadable";
import { Preview } from "containers/Preview/Loadable";
import { parse } from "utils/parse";

const Div = styled.div`
  display: flex;
  height: 100%;
`;

export const HomePage: React.FC = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          content="A minimal, markdown-based presentation tool."
          name="description"
        />
      </Helmet>
      <Div>
        <TextEditor markdown={markdown} setMarkdown={setMarkdown} />
        <Preview html={parse(markdown)} />
      </Div>
    </>
  );
};
