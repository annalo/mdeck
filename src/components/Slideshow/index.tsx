import React, { memo, useContext, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import throttle from "lodash/throttle";

import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";
import { useSlideshowScrollTop } from "utils/useSlideshowScrollTop";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useSlideshowScrollTop();
  const { state } = useContext(MarkdownContext);
  const { html } = state;

  useEffect(() => {
    console.log("slideshow add scroll listener");
    const node = ref.current;
    const handleScroll = throttle(
      () => setScrollTop(node ? node.scrollTop : 0),
      200
    );

    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [setScrollTop]);

  console.log(scrollTop);

  // TODO write test to ensure slideshow div is set as root in observer
  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
