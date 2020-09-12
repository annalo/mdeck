import { useEffect } from "react";
import type { RefObject } from "react";

import { useCodeLineObserver } from "contexts/CodeLineObserver";
import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";

interface UseCodeLineObserveProps {
  elements: SlideContentElements;
  ref: RefObject<HTMLDivElement>;
}

function useCodeLineObserve({ elements, ref }: UseCodeLineObserveProps): void {
  const { observe } = useCodeLineObserver();

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const entries = {};
      const codeLineElements: NodeListOf<Element> = node?.querySelectorAll(
        `.${CODE_LINE_CLASS_NAME}`
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
