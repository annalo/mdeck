import React, { memo, useContext, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import * as R from "ramda";
import throttle from "lodash/throttle";

import { SlideshowContext } from "contexts/SlideshowContext";
import { MarkdownContext } from "contexts/MarkdownContext";

import { render } from "utils/render";

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

  useEffect(() => {
    const node = ref.current;

    const handleScroll = throttle(() => {
      const isTopElement = (entry) => {
        const boundingClientTop = entry.getBoundingClientRect().top;
        return boundingClientTop >= 0 && boundingClientTop <= 18;
      };
      const topElement = R.find(isTopElement, entries);

      const setLineNumber = (entry) => {
        const lineNumber = parseInt(R.path(["dataset", "line"], entry), 10);
        dispatch({
          type: "setPreviewLineNumber",
          previewLineNumber: lineNumber,
        });
      };

      R.either(R.isNil, setLineNumber)(topElement);
    }, 200);

    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [dispatch, entries]);

  return (
    <Div ref={ref} className="slideshow">
      {render(html)}
    </Div>
  );
};

export default memo(Slideshow);
