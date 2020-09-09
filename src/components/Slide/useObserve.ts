import { useEffect } from "react";
import type { RefObject } from "react";

interface UseObserveProps {
  elements: SlideElements;
  ref: RefObject<HTMLDivElement>;
  observe: SlideshowObserver.Observe;
}

export const useObserve = ({
  elements,
  ref,
  observe,
}: UseObserveProps): void => {
  useEffect(() => {
    if (ref.current) observe(ref.current);
  }, [elements, ref, observe]);
};
