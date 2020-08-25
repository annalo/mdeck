import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function usePaneIsActive(
  ref: RefObject<HTMLElement>,
  initialValue: boolean
): boolean {
  const node = ref.current;
  const [isActive, setIsActive] = useState<boolean>(initialValue);
  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  useEffect(() => {
    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);
    return () => {};
  }, [node, setIsActive]);

  return isActive;
}
