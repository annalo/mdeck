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
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Article = styled.article`
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
  const { htmlArray, md, textLineNumber } = useMarkdownState();
  const isActive = usePaneIsActive({ ref, initialValue: false });
  const entries = useCodeLineEntries();

  useSyncSlideshow({ entries, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, isActive, ref });
  useWorker({ dispatch, md });

  return (
    <Container>
      <Article ref={ref} id="slideshow">
        {htmlArray.map((html, i) => (
          <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
        ))}
      </Article>
    </Container>
  );
});

export { Preview };
