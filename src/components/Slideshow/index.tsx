import React, { forwardRef, memo } from "react";
import type { Dispatch } from "react";
import styled from "styled-components";

import type { MarkdownContextReducerAction } from "types/markdown-context-reducer-action";

import { useCodeLineEntries } from "contexts/CodeLineObserver";

import { Slide } from "components/Slide/Loadable";
import { usePaneIsActive } from "utils/usePaneIsActive";
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

const ForwardRefSlideshowComponent = forwardRef<HTMLElement, SlideshowProps>(
  ({ dispatch, htmlArray, textLineNumber }, ref) => {
    const isActive = usePaneIsActive({ ref, initialValue: false });
    const entries = useCodeLineEntries();

    useSyncSlideshow({ entries, textLineNumber });
    useTrackSlideshowScroll({ dispatch, entries, isActive, ref });

    return (
      <Article ref={ref} id="slideshow">
        {htmlArray.map((html, i) => (
          <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
        ))}
      </Article>
    );
  }
);

const Slideshow = memo(ForwardRefSlideshowComponent);

export { Slideshow };
