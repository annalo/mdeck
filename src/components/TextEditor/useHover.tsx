import { useEffect } from "react";
import type { Dispatch, RefObject } from "react";

interface UseHoverProps {
  dispatch: Dispatch<any>;
  paneName: string;
  ref: RefObject<HTMLTextAreaElement>;
}

export function useHover({ dispatch, paneName, ref }: UseHoverProps): void {
  useEffect(() => {
    const handleMouseEnter = () =>
      dispatch({ type: "setActivePane", activePane: paneName });

    const node = ref.current;

    node?.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      node?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [dispatch, paneName, ref]);
}
