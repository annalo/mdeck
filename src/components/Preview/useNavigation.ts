import { useCallback, useEffect, useState } from "react";
import screenfull, { Screenfull } from "screenfull";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { useSlideEntries } from "contexts/SlideObserver";

function useNavigation(): () => void {
  const [presentationMode, togglePresentation] = useState(false);
  const [slideNumber, setSlideNumber] = useState<SlideNumber | null>(null);

  const slideEntries = useSlideEntries();
  const slideCount = Object.keys(slideEntries).length;

  const requestPresentation = useCallback(() => {
    const slideshow = document.querySelector("#slideshow");
    if (slideshow)
      (screenfull as Screenfull).request(slideshow).then(() => {
        console.log("request fullscreen");
        togglePresentation(true);
      });
  }, []);

  useEffect(() => {
    const fullScreen = screenfull as Screenfull;
    const exitFullscreen = () => {
      if (!fullScreen.isFullscreen) togglePresentation(false);
    };
    fullScreen.on("change", exitFullscreen);
    return () => fullScreen.off("change", exitFullscreen);
  }, [togglePresentation]);

  useEffect(() => {
    console.log("use effect set slide number 1 when presentationMode");
    presentationMode ? setSlideNumber(1) : setSlideNumber(null);
  }, [presentationMode]);

  useEffect(() => {
    console.log("useeffect slidenumber changed", slideNumber);
    if (slideNumber) {
      const slide = slideEntries[slideNumber];
      scrollIntoView(slide);
    }
  }, [slideNumber, slideEntries]);

  const nextSlide = useCallback(
    () =>
      setSlideNumber((current) =>
        current && current < slideCount ? current + 1 : current
      ),
    [slideCount]
  );
  const previousSlide = useCallback(
    () =>
      setSlideNumber((current) =>
        current && current > 1 ? current - 1 : current
      ),
    []
  );

  useEffect(() => {
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

    presentationMode
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, presentationMode]);

  return requestPresentation;
}

export { useNavigation };
