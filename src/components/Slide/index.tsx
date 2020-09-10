import React, { memo, useRef } from "react";

import { useElements } from "./useElements";
import { useObserve } from "./useObserve";

interface SlideProps {
  htmlString: HtmlString;
  index: number;
  observe: SlideshowObserver.Observe;
}

export const Slide: React.FC<SlideProps> = ({
  htmlString,
  index,
  observe,
}: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const elements = useElements({ htmlString });
  useObserve({ elements, ref, observe });

  return (
    <div ref={ref} className="slide" id={`slide-${index + 1}`}>
      {elements}
    </div>
  );
};

export default memo(Slide);
