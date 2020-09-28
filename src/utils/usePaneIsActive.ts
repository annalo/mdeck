import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface UsePaneIsActiveProps {
  ref: any;
  initialValue: boolean;
}

function usePaneIsActive({ ref, initialValue }: UsePaneIsActiveProps): boolean {
  const [isActive, setIsActive] = useState<boolean>(initialValue);

  useEffect(() => {
    const node = ref?.current;

    const debounceSetIsActive = debounce((value) => setIsActive(value), 300);
    const handleMouseEnter = () => debounceSetIsActive(true);
    const handleMouseLeave = () => debounceSetIsActive(false);

    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node?.removeEventListener("mouseenter", handleMouseEnter);
      node?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, setIsActive]);

  return isActive;
}

export { usePaneIsActive };
