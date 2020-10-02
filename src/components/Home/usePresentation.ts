import { useCallback, useEffect, useState } from "react";
import screenfull, { Screenfull } from "screenfull";

import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(
  slideshowRef: React.RefObject<HTMLElement>
): RequestPresentation {
  const [isPresented, setIsPresented] = useState(false);
  const dismiss = useCallback(() => setIsPresented(false), []);
  const present = useCallback(() => setIsPresented(true), []);

  useSlideNavigation(isPresented);

  const requestPresentation = useCallback(() => {
    const node = slideshowRef?.current;
    if (node) (screenfull as Screenfull).request(node);
  }, [slideshowRef]);

  useEffect(() => {
    const sf = screenfull as Screenfull; // for Typescript
    const togglePresentation = () => (sf.isFullscreen ? present() : dismiss());

    sf.on("change", togglePresentation);
    return () => sf.off("change", togglePresentation);
  }, [dismiss, present]);

  return requestPresentation;
}

export { usePresentation };
