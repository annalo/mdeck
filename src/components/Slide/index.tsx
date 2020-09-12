import React, { memo, useRef } from "react";

import { useElements } from "./useElements";
import { useSlideObserve } from "./useSlideObserve";
import { useCodeLineObserve } from "./useCodeLineObserve";

interface SlideProps {
  htmlString: HtmlString;
  index: number;
}

const Slide = memo(function Slide({ htmlString, index }: SlideProps) {
  const ref = useRef<HTMLDivElement>(null);

  const elements = useElements({ htmlString });
  useSlideObserve({ ref, slideNumber: index + 1 });
  useCodeLineObserve({ elements, ref });

  return (
    <div ref={ref} className="slide" id={`slide-${index + 1}`}>
      {elements}
    </div>
  );
});

export { Slide };
