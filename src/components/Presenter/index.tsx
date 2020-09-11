import React, { memo } from "react";
import { useNavigation } from "./useNavigation";

interface PresenterProps {
  htmlArray: HtmlArray;
}

const Presenter = memo(function Presenter({ htmlArray }: PresenterProps) {
  const currentSlide = useNavigation({ slideCount: htmlArray.length });

  return (
    <article id="presenter">
      <div
        dangerouslySetInnerHTML={{ __html: htmlArray[currentSlide - 1] }}
        id={`slide-${currentSlide}`}
      />
    </article>
  );
});

export { Presenter };
