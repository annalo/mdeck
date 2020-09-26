import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { useCodeLineEntries } from "contexts/CodeLineObserver";

import { Slide } from "components/Slide/Loadable";

import { usePaneIsActive } from "utils/usePaneIsActive";
import { useWorker } from "./useWorker";
import { useSyncPreview } from "./useSyncPreview";
import { useTrackPreviewScroll } from "./useTrackPreviewScroll";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Slideshow = styled.article`
  height: 100%;
  overflow: auto;

  &:fullscreen {
    scroll-snap-type: y mandatory;

    .slide {
      display: grid;
      height: 100%;
      scroll-snap-align: start;
      svg {
        margin: auto;
      }
    }
  }

  &:-webkit-full-screen {
    background-color: rgba(255, 255, 255, 0);

    .slide {
      display: grid;
      height: 100%;
      svg {
        margin: auto;
      }
    }
  }
`;

const Preview = memo(function Preview() {
  const ref = useRef<HTMLElement>(null);

  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, editorLine } = useMarkdownState();
  const isActive = usePaneIsActive({ ref, initialValue: false });
  const entries = useCodeLineEntries();

  useSyncPreview({ entries, editorLine });
  useTrackPreviewScroll({ dispatch, entries, isActive, ref });
  useWorker({ dispatch, md });

  return (
    <Container>
      <Slideshow ref={ref} id="slideshow">
        {htmlArray.map((html, i) => (
          <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
        ))}
      </Slideshow>
    </Container>
  );
});

export { Preview };
