import React, { memo, useRef } from "react";
import styled from "styled-components";

import type { Dispatch } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context-reducer-action";

import { Slide } from "components/Slide/Loadable";

import { usePaneIsActive } from "utils/usePaneIsActive";
import { useObserver } from "./useObserver";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

interface SlideshowProps {
  dispatch: Dispatch<MarkdownContextReducerAction>;
  htmlArray: HtmlArray;
  textLineNumber: LineNumber;
}

const Article = styled.article`
  height: 100%;
  overflow: auto;
`;

const Slideshow = memo(function Slideshow({
  dispatch,
  htmlArray,
  textLineNumber,
}: SlideshowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = usePaneIsActive({ ref, initialValue: false });
  const { entries, observe } = useObserver();

  useSyncSlideshow({ entries, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, isActive, ref });

  return (
    <Article ref={ref} id="slideshow">
      {htmlArray.map((html, i) => (
        <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
      ))}
    </Article>
  );
});

export { Slideshow };
