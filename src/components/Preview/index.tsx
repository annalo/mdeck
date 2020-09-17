import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";

import { Slideshow } from "components/Slideshow";
import { usePresentation } from "./usePresentation";
import { useWorker } from "./useWorker";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const FullscreenButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Preview = memo(function Preview() {
  const slideshowRef = useRef<HTMLElement>(null);

  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, textLineNumber } = useMarkdownState();

  const requestPresentation = usePresentation(slideshowRef);
  useWorker({ dispatch, md });

  return (
    <Div>
      <Slideshow
        ref={slideshowRef}
        dispatch={dispatch}
        htmlArray={htmlArray}
        textLineNumber={textLineNumber}
      />
      <FullscreenButton
        disabled={md === MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.md}
        onClick={() => requestPresentation()}
        type="button"
      >
        FULLSCREEN
      </FullscreenButton>
    </Div>
  );
});

export { Preview };
