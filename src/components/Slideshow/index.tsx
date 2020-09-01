import React, { memo, useContext, useRef } from "react";
import styled from "styled-components";

import { SlideshowObserver } from "contexts/SlideshowObserver";
import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";

import { useDisconnect } from "./useDisconnect";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

const Article = styled.article`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowObserver);
  const { html, textLineNumber } = state;

  useDisconnect({ disconnect, html });
  useSyncSlideshow({ entries, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, ref });

  return (
    <Article ref={ref} id="slideshow">
      {render(html)}
    </Article>
  );
};

export default memo(Slideshow);
