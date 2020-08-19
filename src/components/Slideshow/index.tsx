import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";

interface Props {
  html: string;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC<Props> = memo(({ html }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

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
    const observer = new IntersectionObserver(handleCallback, {
      root: ref.current,
      rootMargin: "0px",
      threshold: 0.25,
    });
    return () => observer.disconnect();
  });

  return (
    <Container ref={ref} className="slideshow">
      {render(html)}
    </Container>
  );
});
