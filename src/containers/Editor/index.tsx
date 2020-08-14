import React, { useState } from "react";
import styled from "styled-components/macro";

import { TextBox } from "containers/TextBox/Loadable";
import { Preview } from "containers/Preview/Loadable";
import { parse } from "utils/parse";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState(""); // may not need this
  const [htmlString, setHtmlString] = useState("");

  function handleTextChange(text) {
    setMarkdown(text);
    setHtmlString(parse(text));
  }

  return (
    <Container>
      <TextBox handleTextChange={handleTextChange} markdown={markdown} />
      <Preview html={htmlString} />
    </Container>
  );
};
