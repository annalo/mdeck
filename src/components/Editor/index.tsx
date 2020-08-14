import React, { useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const SLIDE_SEPARATOR_REGEX = /\n\s*---\s*\n/;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState(""); // may not need this
  const [slides, setSlides] = useState([]);

  function convertToSlides(text) {
    return text === "" ? [] : text.split(SLIDE_SEPARATOR_REGEX);
  }

  function handleTextChange(text) {
    setMarkdown(text);
    setSlides(convertToSlides(text));
  }

  return (
    <Container>
      <TextEditor handleTextChange={handleTextChange} markdown={markdown} />
      <Preview slides={slides} />
    </Container>
  );
};
