import React, { useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { convertMarkdown } from "utils/parser";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [src, setSrc] = useState(""); // may not need this
  const [html, setHtml] = useState("");

  function handleTextChange(markdown: string) {
    setSrc(markdown);
    setHtml(convertMarkdown(markdown));
  }

  return (
    <Container>
      <TextEditor handleTextChange={handleTextChange} src={src} />
      <Preview html={html} />
    </Container>
  );
};
