import { useEffect, useState } from "react";
import type { RefObject } from "react";
import debounce from "lodash/debounce";

interface UsePaneIsActiveProps {
  ref: RefObject<HTMLElement>;
  initialValue: boolean;
}

export const usePaneIsActive = ({
  ref,
  initialValue,
}: UsePaneIsActiveProps): boolean => {
  const node = ref.current;
  const [isActive, setIsActive] = useState<boolean>(initialValue);

  useEffect(() => {
    const debounceSetIsActive = debounce((value) => setIsActive(value), 300);
    const handleMouseEnter = () => debounceSetIsActive(true);
    const handleMouseLeave = () => debounceSetIsActive(false);

    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node?.removeEventListener("mouseenter", handleMouseEnter);
      node?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [node, setIsActive]);

  return isActive;
};
