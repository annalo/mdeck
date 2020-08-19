import React, { useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

import { parse } from "utils/parse";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [src, setSrc] = useState<string>(""); // TODO may not need to keep track of src
  const [html, setHtml] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<number>(0);

  function handleTextChange(markdown: string) {
    setSrc(markdown);
    setHtml(parse(markdown));
  }

  return (
    <Container>
      <TextEditor
        handleTextChange={handleTextChange}
        setLineNumber={setLineNumber}
        src={src}
      />
      <Preview html={html} />
    </Container>
  );
};
