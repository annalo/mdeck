import React from "react";
import { useElements } from "./useElements";

interface SlideProps {
  htmlString: HtmlString;
}

export const Slide: React.FC<SlideProps> = ({ htmlString }: SlideProps) => {
  const elements = useElements({ htmlString });

  return <div>{elements}</div>;
};
