import React, { memo, useContext, useRef } from "react";
import styled from "styled-components";

import { SlideshowObserver } from "contexts/SlideshowObserver";
import { MarkdownContext } from "contexts/MarkdownContext";

import { useDisconnect } from "./useDisconnect";
import { useSyncSlideshow } from "./useSyncSlideshow";
import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";
import { useWorker } from "./useWorker";

const Article = styled.article`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowObserver);
  const { htmlArray, md, textLineNumber } = state;

  useDisconnect({ disconnect, md });
  useSyncSlideshow({ entries, textLineNumber });
  useTrackSlideshowScroll({ dispatch, entries, ref });

  useWorker({ dispatch, md });

  return (
    <Article ref={ref} id="slideshow">
      {htmlArray.map((html, i) => (
        <div
          key={`slide-${i + 1}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </Article>
  );
};

export default memo(Slideshow);
