import { useEffect } from "react";
import type { RefObject } from "react";

interface UseObserveProps {
  elements: SlideContentElements;
  ref: RefObject<HTMLDivElement>;
  observe: SlideshowObserver.Observe;
}

function useObserve({ elements, ref, observe }: UseObserveProps): void {
  useEffect(() => {
    if (ref.current) observe(ref.current);
  }, [elements, ref, observe]);
}

export { useObserve };
