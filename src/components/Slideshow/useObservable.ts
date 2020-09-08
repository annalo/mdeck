import { useCallback, useEffect, useState } from "react";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";

export const useObservable = (): {
  entries: SlideshowObserver.Entries;
  observe: SlideshowObserver.Observe;
} => {
  const [observerEntries, setObserverEntries] = useState<
    SlideshowObserver.Entries
  >({});

  const observe = useCallback(
    (node) => {
      const entries = {};
      node?.querySelectorAll(`.${CODE_LINE_CLASS_NAME}`).forEach((element) => {
        const dataLine = element.getAttribute(DATA_LINE_ATTRIBUTE);
        if (dataLine) entries[parseInt(dataLine, 10)] = element;
      });
      setObserverEntries((currentEntries) => ({
        ...currentEntries,
        ...entries,
      }));
    },
    [setObserverEntries]
  );

  useEffect(() => {
    return () => setObserverEntries({});
  }, []);

  return { entries: observerEntries, observe };
};
