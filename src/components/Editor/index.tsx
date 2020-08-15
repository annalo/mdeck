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
  const [src, setSrc] = useState(""); // may not need this
  const [slides, setSlides] = useState<string[]>([]);

  function handleTextChange(markdown: string) {
    setSrc(markdown);
    setSlides(parse(markdown));
  }

  return (
    <Container>
      <TextEditor handleTextChange={handleTextChange} src={src} />
      <Preview slides={slides} />
    </Container>
  );
};
