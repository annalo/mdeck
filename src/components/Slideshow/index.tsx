import React, { memo, useContext, useRef } from "react";
import styled from "styled-components";

import { MarkdownContext } from "contexts/MarkdownContext";

import { Slide } from "components/Slide/Loadable";

// import { useSyncSlideshow } from "./useSyncSlideshow";
// import { useTrackSlideshowScroll } from "./useTrackSlideshowScroll";
import { useWorker } from "./useWorker";

const Article = styled.article`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { htmlArray, md } = state;

  // useSyncSlideshow({ entries, textLineNumber });
  // useTrackSlideshowScroll({ dispatch, entries, ref });

  useWorker({ dispatch, md });

  return (
    <Article ref={ref} id="slideshow">
      {htmlArray.map((html, i) => (
        <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
      ))}
    </Article>
  );
};

export default memo(Slideshow);
