import React, { memo, useEffect, useRef } from "react";
import { useElements } from "./useElements";

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

  useEffect(() => {
    if (ref.current) observe(ref.current);
  }, [elements, observe]);

  return (
    <div ref={ref} id={`slide-${index + 1}`}>
      {elements}
    </div>
  );
};

export default memo(Slide);
