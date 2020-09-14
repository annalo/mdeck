import { useEffect, useState } from "react";
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";

import { useSlideEntries } from "contexts/SlideObserver";

interface UseNavigationProps {
  isFullscreen: boolean;
}

function useNavigation({ isFullscreen }: UseNavigationProps): void {
  const [slideNumber, setSlideNumber] = useState<SlideNumber>(1);

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  useEffect(() => {
    console.log("use effect fullscreen");
    if (isFullscreen) setSlideNumber(1);
  }, [isFullscreen, slideEntries]);

  useEffect(() => {
    console.log("useeffect slidenumber changed");
    if (isFullscreen)
      (screenfull as Screenfull).request(slideEntries[slideNumber]);
  }, [isFullscreen, slideEntries, slideNumber]);

  useEffect(() => {
    console.log("use effect handlekey");
    const nextSlide = () =>
      setSlideNumber((current) =>
        current < slideCount ? current + 1 : current
      );

    const previousSlide = () =>
      setSlideNumber((current) => (current > 1 ? current - 1 : current));

    const handleKeyDown = (e) => {
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

    isFullscreen
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, slideCount, slideEntries]);
}

export { useNavigation };
