import React, { memo, useRef } from "react";
import styled from "styled-components";

import { slideStyle } from "./slide-style";
import { useElements } from "./useElements";
import { useSlideObserve } from "./useSlideObserve";
import { useCodeLineObserve } from "./useCodeLineObserve";

const SlideContainer = styled.div`
  margin: 0.5em;
  border: 1px solid ${(props) => props.theme.colors.gallery};
  box-shadow: 0px 1px 2px 1px ${(props) => props.theme.colors.gallery}70;

  ${slideStyle}
`;

interface SlideProps {
  htmlString: HtmlString;
  index: number;
}

const Slide = memo(function Slide({ htmlString, index }: SlideProps) {
  const ref = useRef<HTMLDivElement>(null);

  const elements = useElements(htmlString);
  useSlideObserve({ ref, slideNumber: index + 1 });
  useCodeLineObserve({ elements, ref });

  return (
    <SlideContainer ref={ref} className="slide" id={`slide-${index + 1}`}>
      {elements}
    </SlideContainer>
  );
});

export { Slide };
