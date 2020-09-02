import { useContext, useEffect } from "react";
import type { RefObject } from "react";
import { SlideshowObserver } from "contexts/SlideshowObserver";

interface UseObserveElementProps {
  ref: RefObject<Element>;
}

export const useObserveElement = ({ ref }: UseObserveElementProps): void => {
  const { observe } = useContext(SlideshowObserver);

  useEffect(() => {
    const node = ref.current;
    if (node) observe(node);
  }, [observe, ref]);
};
