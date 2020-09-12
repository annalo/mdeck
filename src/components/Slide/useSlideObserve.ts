import { useEffect } from "react";
import type { RefObject } from "react";
import { useSlideObserver } from "contexts/SlideObserver";

interface UseSlideObserveProps {
  ref: RefObject<HTMLDivElement>;
  slideNumber: number;
}

function useSlideObserve({ ref, slideNumber }: UseSlideObserveProps): void {
  const { observe } = useSlideObserver();

  useEffect(() => {
    if (ref.current) observe(slideNumber, ref.current);
  }, [observe, ref, slideNumber]);
}

export { useSlideObserve };
