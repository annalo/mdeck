import React, { memo, useContext, useRef, useEffect } from "react";
import styled from "styled-components/macro";

import { SlideshowContext } from "contexts/SlideshowContext";
import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";
import { useSlideshowSync } from "./useSlideshowSync";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowContext);

  const { html } = state;

  useEffect(() => {
    return () => disconnect();
  }, [html, disconnect]);

  useSlideshowSync({ dispatch, entries, ref });

  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
