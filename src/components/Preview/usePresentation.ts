import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import screenfull, { Screenfull } from "screenfull";

import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(slideshowRef: RefObject<HTMLElement>): () => void {
  const [isActive, togglePresentation] = useState(false);
  const { nextSlide, previousSlide } = useSlideNavigation(isActive);

  const requestPresentation = useCallback(() => {
    if (slideshowRef.current)
      (screenfull as Screenfull).request(slideshowRef.current);
  }, [slideshowRef]);

  useEffect(() => {
    const sf = screenfull as Screenfull; // for Typescript
    const setIsActive = () => togglePresentation(sf.isFullscreen);

    sf.on("change", setIsActive);
    return () => sf.off("change", setIsActive);
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

    isActive
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, isActive]);

  return requestPresentation;
}

export { usePresentation };
