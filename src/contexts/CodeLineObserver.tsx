import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as R from "ramda";

const CODE_LINE_OBSERVER_DEFAULT_INITIAL_STATE = {};

const CodeLineEntriesContext = createContext<
  CodeLineObserver.Entries | undefined
>(undefined);
const CodeLineObserverContext = createContext<
  CodeLineObserver.Observer | undefined
>(undefined);

const CodeLineObserverProvider: React.FC<CodeLineObserver.ProviderProps> = ({
  children,
  initialEntries,
}: CodeLineObserver.ProviderProps) => {
  const [entries, setEntries] = useState(
    initialEntries || CODE_LINE_OBSERVER_DEFAULT_INITIAL_STATE
  );
  const observe: CodeLineObserver.Observe = useCallback(
    (targetEntries) =>
      setEntries((currentEntries) =>
        R.mergeRight(currentEntries, targetEntries)
      ),
    []
  );

  const observerProviderValue = useMemo(() => ({ observe }), [observe]);
  return (
    <CodeLineEntriesContext.Provider value={entries}>
      <CodeLineObserverContext.Provider value={observerProviderValue}>
        {children}
      </CodeLineObserverContext.Provider>
    </CodeLineEntriesContext.Provider>
  );
};

function useCodeLineEntries(): CodeLineObserver.Entries {
  const context = useContext(CodeLineEntriesContext);
  if (context === undefined) {
    throw new Error(
      "useCodeLineEntries must be used within CodeLineObserverProvider or SlideshowObservable"
    );
  }
  return context;
}

function useCodeLineObserver(): CodeLineObserver.Observer {
  const context = useContext(CodeLineObserverContext);
  if (context === undefined) {
    throw new Error(
      "useCodeLineObserver must be used within CodeLineObserverProvider or SlideshowObservable"
    );
  }
  return context;
}

export { CodeLineObserverProvider, useCodeLineEntries, useCodeLineObserver };
