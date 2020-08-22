import { useContext, useEffect } from "react";
import type { RefObject } from "react";
import { MarkdownContext } from "contexts/MarkdownContext";

interface UseActivePaneProps {
  paneName: string;
  ref: RefObject<HTMLElement>;
}

export function useActivePane({ paneName, ref }: UseActivePaneProps): void {
  const { dispatch } = useContext(MarkdownContext);

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
