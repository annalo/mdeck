import React, { memo } from "react";

import { useNavigation } from "./useNavigation";

interface PresenterProps {
  htmlArray: HtmlArray;
}

const Presenter = memo(function Presenter({ htmlArray }: PresenterProps) {
  const currentSlide = useNavigation();

  return (
    <div id="presenter">
      <div dangerouslySetInnerHTML={{ __html: htmlArray[currentSlide] }} />
    </div>
  );
});

export { Presenter };
