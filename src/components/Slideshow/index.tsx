import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";
import { ObserverContext } from "utils/ObserverContext";

interface Props {
  html: string;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC<Props> = ({ html }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const handleCallback = (entries, _observer) => {
    // entries.forEach((entry) => {
    //   // Each entry describes an intersection change for one observed
    //   // target element:
    //   //   entry.boundingClientRect
    //   //   entry.intersectionRatio
    //   //   entry.intersectionRect
    //   //   entry.isIntersecting
    //   //   entry.rootBounds
    //   //   entry.target
    //   //   entry.time
    // });
  };

  useEffect(() => {
    console.log("use effect");
    setObserver(
      new IntersectionObserver(handleCallback, {
        root: ref.current,
        rootMargin: "0px",
        threshold: 0.25,
      })
    );
  }, [setObserver]);

  return (
    <ObserverContext.Provider value={observer}>
      <Container ref={ref} className="slideshow">
        {render(html)}
      </Container>
    </ObserverContext.Provider>
  );
};

export default memo(Slideshow);
