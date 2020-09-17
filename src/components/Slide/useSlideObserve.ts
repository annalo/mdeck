import { useEffect } from "react";
import type { RefObject } from "react";
import { useSlideObserver } from "contexts/SlideObserver";

interface UseSlideObserveProps {
  ref: RefObject<HTMLElement>;
  slideNumber: number;
}

function useSlideObserve({ ref, slideNumber }: UseSlideObserveProps): void {
  const { observe, unobserve } = useSlideObserver();

  useEffect(() => {
    if (ref.current) observe(slideNumber, ref.current);
    return () => unobserve(slideNumber);
  }, [ref, slideNumber, observe, unobserve]);
}

export { useSlideObserve };
