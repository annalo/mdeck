import React, { memo, useEffect, useState } from "react";
import { render } from "utils/render";

interface SlideProps {
  htmlString: HtmlString;
  index: number;
}

export const Slide: React.FC<SlideProps> = ({
  htmlString,
  index,
}: SlideProps) => {
  const [elements, setElements] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (index === 0) console.log("rerendering slide 1");
  });

  useEffect(() => setElements(render(htmlString)), [htmlString]);

  return <div>{elements}</div>;
};

export default memo(Slide);
