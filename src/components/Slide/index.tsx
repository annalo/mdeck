import React, { useEffect, useState } from "react";
import { render } from "utils/render";

interface SlideProps {
  htmlString: HtmlString;
}

export const Slide: React.FC<SlideProps> = ({ htmlString }: SlideProps) => {
  const [elements, setElements] = useState<React.ReactNode>(null);

  useEffect(() => setElements(render(htmlString)), [htmlString]);

  return <div>{elements}</div>;
};
