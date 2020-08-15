import React, { useState } from "react";
import styled from "styled-components/macro";

import { TextEditor } from "components/TextEditor/Loadable";
import { Preview } from "components/Preview/Loadable";

const SLIDE_DELIMITER_REGEX = /\n\s*---\s*\n/;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Editor: React.FC = () => {
  const [src, setSrc] = useState(""); // may not need this
  const [slides, setSlides] = useState([]);

  function convertToSlides(text) {
    return text === "" ? [] : text.split(SLIDE_DELIMITER_REGEX);
  }

  function handleTextChange(text) {
    setSrc(text);
    setSlides(convertToSlides(text));
  }

  return (
    <Container>
      <TextEditor handleTextChange={handleTextChange} src={src} />
      <Preview slides={slides} />
    </Container>
  );
};
