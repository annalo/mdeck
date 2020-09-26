import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as R from "ramda";

const SLIDE_ENTRIES_INITIAL_STATE = {};

const SlideEntriesContext = createContext<SlideObserver.Entries | undefined>(
  undefined
);
const SlideObserverContext = createContext<SlideObserver.Observer | undefined>(
  undefined
);

const SlideObserverProvider: React.FC<SlideObserver.ProviderProps> = ({
  children,
  initialEntries,
}: SlideObserver.ProviderProps) => {
  const [entries, setEntries] = useState<SlideObserver.Entries>(
    initialEntries || SLIDE_ENTRIES_INITIAL_STATE
  );
  const observe: SlideObserver.Observe = useCallback(
    (slideNumber, targetElement) =>
      setEntries((currentEntries) =>
        R.mergeRight(currentEntries, { [slideNumber]: targetElement })
      ),
    []
  );
  const unobserve: SlideObserver.Unobserve = useCallback(
    (slideNumber: SlideNumber) =>
      setEntries((currentEntries) => R.omit([slideNumber], currentEntries)),
    []
  );

  const observerProviderValue = useMemo(() => ({ observe, unobserve }), [
    observe,
    unobserve,
  ]);
  return (
    <SlideEntriesContext.Provider value={entries}>
      <SlideObserverContext.Provider value={observerProviderValue}>
        {children}
      </SlideObserverContext.Provider>
    </SlideEntriesContext.Provider>
  );
};

function useSlideEntries(): SlideObserver.Entries {
  const context = useContext(SlideEntriesContext);
  if (context === undefined) {
    throw new Error(
      "useSlideEntries must be used within a SlideObserverProvider"
    );
  }
  return context;
}

function useSlideObserver(): SlideObserver.Observer {
  const context = useContext(SlideObserverContext);
  if (context === undefined) {
    throw new Error(
      "useSlideObserver must be used within a SlideObserverProvider"
    );
  }
  return context;
}

export { SlideObserverProvider, useSlideEntries, useSlideObserver };
