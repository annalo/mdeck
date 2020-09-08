import React, { memo, useEffect, useRef, useState } from "react";
import { render } from "utils/render";

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
  const [elements, setElements] = useState<React.ReactNode>(null);

  useEffect(() => setElements(render(htmlString)), [htmlString]);

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
