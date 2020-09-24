import React, { memo, useRef } from "react";
import styled from "styled-components";

import { useElements } from "./useElements";
import { useSlideObserve } from "./useSlideObserve";
import { useCodeLineObserve } from "./useCodeLineObserve";

const Section = styled.section`
  svg {
    background-color: white;
  }
`;

interface SlideProps {
  htmlString: HtmlString;
  index: number;
}

const Slide = memo(function Slide({ htmlString, index }: SlideProps) {
  const ref = useRef<HTMLElement>(null);

  const elements = useElements(htmlString);
  useSlideObserve({ ref, slideNumber: index + 1 });
  useCodeLineObserve({ elements, ref });

  return (
    <Section ref={ref} className="slide" id={`slide-${index + 1}`}>
      {elements}
    </Section>
  );
});

export { Slide };
