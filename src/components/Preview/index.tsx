import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";

import { Slideshow } from "components/Slideshow";

import { useWorker } from "./useWorker";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Preview = memo(function Preview() {
  const slideshowRef = useRef<HTMLElement>(null);

  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, textLineNumber } = useMarkdownState();

  useWorker({ dispatch, md });

  return (
    <Container>
      <Slideshow
        ref={slideshowRef}
        dispatch={dispatch}
        htmlArray={htmlArray}
        textLineNumber={textLineNumber}
      />
    </Container>
  );
});

export { Preview };
