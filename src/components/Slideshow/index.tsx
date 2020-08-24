import React, { memo, useContext, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import { SlideshowContext } from "contexts/SlideshowContext";
import { MarkdownContext } from "contexts/MarkdownContext";

import { render } from "utils/render";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state } = useContext(MarkdownContext);
  const { entries, disconnect } = useContext(SlideshowContext);

  const { html } = state;

  useEffect(() => {
    return () => disconnect();
  }, [html, disconnect]);

  // TODO write test to ensure slideshow div is set as root in observer
  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
