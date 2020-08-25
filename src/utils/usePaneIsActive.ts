import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function usePaneIsActive(ref: RefObject<HTMLElement>): boolean {
  const node = ref.current;
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  useEffect(() => {
    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);
    return () => {};
  }, [node, setIsActive]);

  return isActive;
}
