import React from "react";

interface SlideProps {
  htmlString: HtmlString;
}

export const Slide: React.FC<SlideProps> = ({ htmlString }: SlideProps) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};
