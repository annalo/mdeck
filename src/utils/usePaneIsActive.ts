import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface UsePaneIsActiveProps {
  ref: React.RefObject<HTMLElement>;
  initialValue: boolean;
}

function usePaneIsActive({ ref, initialValue }: UsePaneIsActiveProps): boolean {
  const [isActive, setIsActive] = useState<boolean>(initialValue);
  const node = ref?.current;

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
}

export { usePaneIsActive };
