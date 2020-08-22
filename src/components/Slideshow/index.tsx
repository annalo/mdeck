import React, { memo, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import throttle from "lodash/throttle";

import { ObserverProvider } from "contexts/ObserverContext";
import { MarkdownContext } from "contexts/MarkdownContext";
import { render } from "utils/render";

const Div = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { html } = state;

  useEffect(() => {
    const observerCallback = throttle(
      (entries: IntersectionObserverEntry[]) => {
        const topElement: any = entries.find(
          (entry) => entry.boundingClientRect.top < 25
        );
        if (topElement) {
          // TODO test preview number is set
          dispatch({
            type: "setPreviewLineNumber",
            previewLineNumber: parseInt(topElement.target.dataset.line, 10),
          });
        }
      },
      50
    );
    setObserver(
      new IntersectionObserver(observerCallback, {
        root: ref.current,
        rootMargin: "0px",
        threshold: [0.2, 1.0],
      })
    );
  }, [setObserver, dispatch]);

  // TODO write test to ensure slideshow div is set as root in observer
  return (
    <ObserverProvider observer={observer}>
      <Div ref={ref} className="slideshow">
        {render(html)}
      </Div>
    </ObserverProvider>
  );
};

export default memo(Slideshow);
