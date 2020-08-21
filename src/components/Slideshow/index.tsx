import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";
import { ObserverProvider } from "contexts/ObserverContext";

interface SlideshowProps {
  html: string;
  setLineNumber(value: number): void;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC<SlideshowProps> = ({
  html,
  setLineNumber,
}: SlideshowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log("initializing observer");
    setObserver(
      new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const topElement: any = entries.find(
            (entry) => entry.boundingClientRect.top < 25
          );
          if (topElement)
            setLineNumber(parseInt(topElement.target.dataset.line, 10));
        },
        {
          root: ref.current,
          rootMargin: "0px",
          threshold: [0.2, 1.0],
        }
      )
    );
  }, [setObserver, setLineNumber]);

  return (
    <ObserverProvider observer={observer}>
      <Container className="slideshow">{render(html)}</Container>
    </ObserverProvider>
  );
};

export default memo(Slideshow);
