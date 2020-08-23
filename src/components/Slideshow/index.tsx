import React, { memo, useContext, useRef, useEffect } from "react";
import styled from "styled-components/macro";

import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";
import { useSlideshowScrollTop } from "utils/useSlideshowScrollTop";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state } = useContext(MarkdownContext);
  const { html } = state;

  const scrollTop = useSlideshowScrollTop(ref);

  useEffect(() => {
    console.log(scrollTop);
  }, [scrollTop]);

  // TODO write test to ensure slideshow div is set as root in observer
  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
