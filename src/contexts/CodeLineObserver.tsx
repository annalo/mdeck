import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as R from "ramda";

const CODE_LINE_OBSERVER_DEFAULT_INITIAL_STATE = {};

const CodeLineObserver = createContext<CodeLineObserverContext | undefined>(
  undefined
);

const CodeLineObserverProvider: React.FC<CodeLineObserverProviderProps> = ({
  children,
  initialEntries,
}: CodeLineObserverProviderProps) => {
  const [entries, setEntries] = useState(
    initialEntries || CODE_LINE_OBSERVER_DEFAULT_INITIAL_STATE
  );
  const observe = useCallback(
    (targetEntries) =>
      setEntries((currentEntries) =>
        R.mergeRight(currentEntries, targetEntries)
      ),
    []
  );

  const value = useMemo(() => ({ entries, observe }), [entries, observe]);
  return (
    <CodeLineObserver.Provider value={value}>
      {children}
    </CodeLineObserver.Provider>
  );
};

function useCodeLineObserver(): CodeLineObserverContext {
  const context = useContext(CodeLineObserver);
  if (context === undefined) {
    throw new Error(
      "useCodeLineObserver must be used within a CodeLineObserverProvider"
    );
  }
  return context;
}

export { CodeLineObserverProvider, useCodeLineObserver };
