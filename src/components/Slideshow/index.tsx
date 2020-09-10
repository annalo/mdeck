import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";

import { Slide } from "components/Slide/Loadable";

import { usePaneIsActive } from "utils/usePaneIsActive";
import { useObservable } from "./useObservable";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";
import { useWorker } from "./useWorker";

const Article = styled.article`
  height: 100%;
  overflow: auto;
`;

const Slideshow = memo(function Slideshow() {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, textLineNumber } = useMarkdownState();

  const isActive = usePaneIsActive({ ref, initialValue: false });
  const { entries, observe } = useObservable();

  useSyncSlideshow({ entries, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, isActive, ref });

  useWorker({ dispatch, md });

  return (
    <Article ref={ref} id="slideshow">
      {htmlArray.map((html, i) => (
        <Slide
          key={`slide-${i + 1}`}
          htmlString={html}
          index={i}
          observe={observe}
        />
      ))}
    </Article>
  );
});

export { Slideshow };
