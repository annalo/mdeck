import { useCallback, useEffect, useState } from "react";
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";

import { useSlideEntries } from "contexts/SlideObserver";

interface UseNavigationProps {
  presentationOn: boolean;
  togglePresentation: (boolean) => void;
}

function useNavigation({
  presentationOn,
  togglePresentation,
}: UseNavigationProps): void {
  const [slideNumber, setSlideNumber] = useState<SlideNumber | null>(null);

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  useEffect(() => {
    (screenfull as Screenfull).on("change", () => {
      if (!(screenfull as Screenfull).isFullscreen) togglePresentation(false);
    });
  }, [togglePresentation]);

  useEffect(() => {
    console.log("use effect fullscreen");
    presentationOn ? setSlideNumber(1) : setSlideNumber(null);
  }, [presentationOn]);

  useEffect(() => {
    console.log("useeffect slidenumber changed", slideNumber);
    if (slideNumber)
      (screenfull as Screenfull).request(slideEntries[slideNumber]);
  }, [slideEntries, slideNumber]);

  const nextSlide = useCallback(
    () =>
      setSlideNumber((current) =>
        current && current < slideCount ? current + 1 : current
      ),
    [setSlideNumber, slideCount]
  );

  const previousSlide = useCallback(
    () =>
      setSlideNumber((current) =>
        current && current > 1 ? current - 1 : current
      ),
    [setSlideNumber]
  );

  useEffect(() => {
    console.log("use effect handlekey");
    const handleKeyDown = (e) => {
      console.log("handlekeydown");
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

    presentationOn
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [presentationOn, nextSlide, previousSlide, togglePresentation]);
}

export { useNavigation };
