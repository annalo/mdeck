import { useEffect, useState } from "react";
import type { RefObject } from "react";
import throttle from "lodash/throttle";

export function useSlideshowScrollTop(ref: RefObject<HTMLDivElement>): number {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const node = ref.current;

    const handleScroll = throttle(() => {
      setScrollTop(node ? node.scrollTop : 0);
    }, 200);

    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollTop;
}
