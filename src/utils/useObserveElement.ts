import { useContext, useEffect } from "react";
import type { RefObject } from "react";
import { SlideshowObserver } from "contexts/SlideshowObserver";

interface UseObserveElementProps {
  ref: RefObject<Element | SVGSVGElement>;
}

export const useObserveElement = ({ ref }: UseObserveElementProps) => {
  const { observe } = useContext(SlideshowObserver);

  useEffect(() => {
    const node = ref.current;
    if (node) observe(node);
  }, [observe, ref]);
};
