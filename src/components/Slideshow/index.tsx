import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";
import { ObserverContext } from "utils/ObserverContext";

interface Props {
  html: string;
  setLineNumber(value: number): void;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC<Props> = ({ html, setLineNumber }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log("initializing observer");
    setObserver(
      new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const topElement: any = entries.find(
            (entry) => entry.boundingClientRect.top < 10
          );
          if (topElement) {
            setLineNumber(parseInt(topElement.target.dataset.line, 10));
          }
        },
        {
          root: ref.current,
          rootMargin: "0px",
          threshold: 1.0,
        }
      )
    );
  }, [setObserver, setLineNumber]);

  return (
    <ObserverContext.Provider value={observer}>
      <Container ref={ref} className="slideshow">
        {render(html)}
      </Container>
    </ObserverContext.Provider>
  );
};

export default memo(Slideshow);
