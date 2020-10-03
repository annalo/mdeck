import { useEffect } from "react";

import { useCodeLineObserver } from "contexts/CodeLineObserver";
import { DATA_LINE_ATTRIBUTE } from "utils/parsePlugins/injectLineNumber";

interface UseCodeLineObserveProps {
  elements: SlideContentElements;
  ref: React.RefObject<HTMLElement>;
}

function useCodeLineObserve({ elements, ref }: UseCodeLineObserveProps): void {
  const { observe } = useCodeLineObserver();

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const entries = {};
      const codeLineElements: NodeListOf<Element> = node?.querySelectorAll(
        `[${DATA_LINE_ATTRIBUTE}]`
      );

      codeLineElements.forEach((element) => {
        const dataLine = element.getAttribute(DATA_LINE_ATTRIBUTE);
        if (dataLine) entries[dataLine] = element;
      });

      observe(entries);
    }
  }, [elements, ref, observe]);
}

export { useCodeLineObserve };
