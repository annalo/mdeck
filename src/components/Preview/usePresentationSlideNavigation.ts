import { useCallback, useEffect, useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { useSlideEntries } from "contexts/SlideObserver";

const INITIAL_SLIDE_NUMBER = 1;

function useSlideNavigation(isActive: boolean): { nextSlide; previousSlide } {
  const [slideNumber, setSlideNumber] = useState<SlideNumber>(
    INITIAL_SLIDE_NUMBER
  );

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
    () =>
      setSlideNumber((current) =>
        current > INITIAL_SLIDE_NUMBER ? current - 1 : current
      ),
    []
  );

  // Resets slide number when isActive changes
  useEffect(() => setSlideNumber(INITIAL_SLIDE_NUMBER), [isActive]);

  useEffect(() => {
    if (isActive) scrollIntoView(slideEntries[slideNumber]);
  }, [isActive, slideNumber, slideEntries]);

  return { nextSlide, previousSlide };
}

export { useSlideNavigation };
