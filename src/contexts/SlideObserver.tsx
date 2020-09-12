import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as R from "ramda";

const SLIDE_OBSERVER_DEFAULT_INITIAL_STATE = {};

const SlideObserver = createContext<SlideObserverContext | undefined>(
  undefined
);

const SlideObserverProvider: React.FC<SlideObserverProviderProps> = ({
  children,
  initialEntries,
}: SlideObserverProviderProps) => {
  const [entries, setEntries] = useState(
    initialEntries || SLIDE_OBSERVER_DEFAULT_INITIAL_STATE
  );
  const observe = useCallback(
    (slideNumber, element) =>
      setEntries((currentEntries) =>
        R.mergeRight(currentEntries, { [slideNumber]: element })
      ),
    []
  );
  const unobserve = useCallback(
    (slideNumber: SlideNumber) =>
      setEntries((currentEntries) => R.omit([slideNumber], currentEntries)),
    []
  );

  const value = useMemo(
    () => ({
      entries,
      observe,
      unobserve,
    }),
    [entries, observe, unobserve]
  );
  return (
    <SlideObserver.Provider value={value}>{children}</SlideObserver.Provider>
  );
};

function useSlideObserver(): SlideObserverContext {
  const context = useContext(SlideObserver);
  if (context === undefined) {
    throw new Error(
      "useSlideObserver must be used within a SlideObserverProvider"
    );
  }
  return context;
}

export { SlideObserverProvider, useSlideObserver };
