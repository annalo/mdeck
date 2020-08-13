import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import MarkdownItTaskLists from "markdown-it-task-lists";

import { TextEditor } from "containers/TextEditor/Loadable";

export const HomePage = () => {
  const [markdown, setMarkdown] = useState("");

  function sanitizeHTML(dirty: string): string {
    return DOMPurify.sanitize(dirty);
  }

  function parseMarkdown(text: string): string {
    const parser = new MarkdownIt().use(MarkdownItTaskLists);
    const result = parser.render(text);

    return sanitizeHTML(result);
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
