import { useEffect } from "react";
import screenfull, { Screenfull } from "screenfull";

import {
  usePresentationState,
  usePresentationActions,
} from "contexts/PresentationContext";
import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(slideshowRef: any): void {
  const isPresented = usePresentationState();
  const { dismiss, present } = usePresentationActions();

  useSlideNavigation(isPresented);

  // const requestPresentation = useCallback(() => {
  //   if (slideshowRef.current)
  //     (screenfull as Screenfull).request(slideshowRef.current);
  // }, [slideshowRef]);

  useEffect(() => {
    const node = slideshowRef?.current;
    if (node && isPresented) (screenfull as Screenfull).request(node);
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
