import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import screenfull, { Screenfull } from "screenfull";

import { useSlideNavigation } from "./usePresentationSlideNavigation";

function usePresentation(slideshowRef: RefObject<HTMLElement>): () => void {
  const [isActive, togglePresentation] = useState(false);

  useSlideNavigation(isActive);

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

  return requestPresentation;
}

export { usePresentation };
