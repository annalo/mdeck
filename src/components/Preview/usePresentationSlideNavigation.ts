import { useCallback, useEffect, useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { useSlideEntries } from "contexts/SlideObserver";

const INITIAL_SLIDE_NUMBER = 1;

function useSlideNavigation(isActive: boolean): SlideNumber {
  const [slideNumber, setSlideNumber] = useState<SlideNumber>(
    INITIAL_SLIDE_NUMBER
  );

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  // Resets slide number when isActive updates
  useEffect(() => setSlideNumber(INITIAL_SLIDE_NUMBER), [isActive]);

  // Scrolls to slide when slide number updates
  useEffect(() => {
    if (isActive) scrollIntoView(slideEntries[slideNumber]);
  }, [isActive, slideNumber, slideEntries]);

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

  // Keydown slide navigation
  useEffect(() => {
    const handleKeyDown = (ev) => {
      ev.preventDefault();

      switch (ev.keyCode) {
        case 37: // ArrowLeft
        case 38: // ArrowUp
          previousSlide();
          break;

        case 39: // ArrowRight
        case 40: // ArrowDown
          nextSlide();
          break;

        default: {
          break;
        }
      }
    };

    isActive
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, isActive]);

  return slideNumber;
}

export { INITIAL_SLIDE_NUMBER, useSlideNavigation };
