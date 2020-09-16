import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import screenfull, { Screenfull } from "screenfull";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { useSlideEntries } from "contexts/SlideObserver";

function usePresentation(slideshowRef: RefObject<HTMLElement>): () => void {
  const [presentationMode, togglePresentation] = useState(false);
  const [slideNumber, setSlideNumber] = useState<SlideNumber>(1);

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  const requestPresentation = useCallback(() => {
    if (slideshowRef.current)
      (screenfull as Screenfull).request(slideshowRef.current);
  }, [slideshowRef]);

  useEffect(() => {
    const fullScreen = screenfull as Screenfull; // for Typescript
    const setPresentationMode = () => {
      togglePresentation(fullScreen.isFullscreen);
      if (fullScreen.isFullscreen) setSlideNumber(1);
    };

    fullScreen.on("change", setPresentationMode);
    return () => fullScreen.off("change", setPresentationMode);
  }, []);

  useEffect(() => {
    if (presentationMode) scrollIntoView(slideEntries[slideNumber]);
  }, [presentationMode, slideNumber, slideEntries]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();

      switch (e.keyCode) {
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

    presentationMode
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, presentationMode]);

  return requestPresentation;
}

export { usePresentation };
