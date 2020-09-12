import React, { memo } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { SlideshowObservable } from "contexts/SlideshowObservable";

import { Slideshow } from "components/Slideshow";
import { useWorker } from "./useWorker";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Preview = memo(function Preview() {
  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, textLineNumber } = useMarkdownState();

  useWorker({ dispatch, md });

  return (
    <Div>
      <SlideshowObservable>
        <Slideshow
          dispatch={dispatch}
          htmlArray={htmlArray}
          textLineNumber={textLineNumber}
        />
      </SlideshowObservable>
    </Div>
  );
});

export { Preview };
