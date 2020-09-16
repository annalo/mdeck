import { useCallback, useEffect, useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { useSlideEntries } from "contexts/SlideObserver";

function useSlideNavigation(
  presentationMode: boolean
): { nextSlide; previousSlide } {
  const [slideNumber, setSlideNumber] = useState<SlideNumber>(1);

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  const nextSlide = useCallback(
    () =>
      setSlideNumber((current) =>
        current < slideCount ? current + 1 : current
      ),
    [slideCount]
  );
  const previousSlide = useCallback(
    () => setSlideNumber((current) => (current > 1 ? current - 1 : current)),
    []
  );

  useEffect(() => setSlideNumber(1), [presentationMode]);

  useEffect(() => {
    if (presentationMode) scrollIntoView(slideEntries[slideNumber]);
  }, [presentationMode, slideNumber, slideEntries]);

  return { nextSlide, previousSlide };
}

export { useSlideNavigation };
