import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import MarkdownIt from "markdown-it";
import styled from "styled-components/macro";

import { TextEditor } from "containers/TextEditor/Loadable";

export const HomePage = () => {
  const [markdown, setMarkdown] = useState("");

  function parseMarkdown(text: string): string {
    const parser = new MarkdownIt();
    return parser.render(text);
  }

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
        <div
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(markdown),
          }}
        />
      </Div>
    </>
  );
};

const Div = styled.div`
  height: 100%;
`;

export default HomePage;
