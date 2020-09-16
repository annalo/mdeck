import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import screenfull, { Screenfull } from "screenfull";

import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(slideshowRef: RefObject<HTMLElement>): () => void {
  const [presentationMode, togglePresentation] = useState(false);

  const requestPresentation = useCallback(() => {
    if (slideshowRef.current)
      (screenfull as Screenfull).request(slideshowRef.current);
  }, [slideshowRef]);

  const { nextSlide, previousSlide } = useSlideNavigation(presentationMode);

  useEffect(() => {
    const fullScreen = screenfull as Screenfull; // for Typescript
    const setPresentationMode = () =>
      togglePresentation(fullScreen.isFullscreen);

    fullScreen.on("change", setPresentationMode);
    return () => fullScreen.off("change", setPresentationMode);
  }, []);

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
