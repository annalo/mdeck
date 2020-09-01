import React, { memo, useContext, useRef } from "react";
import styled from "styled-components";

import { SlideshowObserver } from "contexts/SlideshowObserver";
import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";

import { useDisconnect } from "./useDisconnect";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowObserver);
  const { html, textLineNumber } = state;

  useDisconnect({ disconnect, html });
  useSyncSlideshow({ entries, ref, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, ref });

  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
