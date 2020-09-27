import { useEffect } from "react";
import type { RefObject } from "react";
import screenfull, { Screenfull } from "screenfull";

import {
  usePresentationState,
  usePresentationActions,
} from "contexts/PresentationContext";
import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(slideshowRef: RefObject<HTMLElement>): void {
  const isPresented = usePresentationState();
  const { dismiss, present } = usePresentationActions();

  useSlideNavigation(isPresented);

  // const requestPresentation = useCallback(() => {
  //   if (slideshowRef.current)
  //     (screenfull as Screenfull).request(slideshowRef.current);
  // }, [slideshowRef]);

  useEffect(() => {
    if (slideshowRef.current && isPresented)
      (screenfull as Screenfull).request(slideshowRef.current);
  }, [isPresented, slideshowRef]);

  useEffect(() => {
    const sf = screenfull as Screenfull; // for Typescript
    const togglePresentation = () => (sf.isFullscreen ? present() : dismiss());

    sf.on("change", togglePresentation);
    return () => sf.off("change", togglePresentation);
  }, [dismiss, present]);

  // return requestPresentation;
}

export { usePresentation };
