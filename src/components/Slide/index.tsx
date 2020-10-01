import React, { memo, useRef } from "react";
import styled from "styled-components";

import { useElements } from "./useElements";
import { useSlideObserve } from "./useSlideObserve";
import { useCodeLineObserve } from "./useCodeLineObserve";

const Section = styled.section`
  border: 1px solid ${(props) => props.theme.colorScheme.lightgrey};
  box-shadow: 0px 1px 2px 2px ${(props) => props.theme.colorScheme.lightgrey}70;
  margin: 0.5em;
  padding: 1em;
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
