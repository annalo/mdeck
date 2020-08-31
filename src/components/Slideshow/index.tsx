import React, { memo, useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { SlideshowObserver } from "contexts/SlideshowObserver";
import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";

import { useTrackScroll } from "./useTrackScroll";
import { useSyncSlideshow } from "./useSyncSlideshow";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowObserver);

  const { html, textLineNumber } = state;

  useEffect(() => {
    return () => disconnect();
  }, [html, disconnect]);

  useTrackScroll({ dispatch, entries, ref });
  useSyncSlideshow({ entries, ref, textLineNumber });

  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
