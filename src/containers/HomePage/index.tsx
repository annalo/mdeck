import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import { TextEditor } from "containers/TextEditor/Loadable";

export const HomePage = () => {
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
        mdeck
        <TextEditor markdown={markdown} setMarkdown={setMarkdown} />
        {markdown}
      </Div>
    </>
  );
};

const Div = styled.div``;

export default HomePage;
