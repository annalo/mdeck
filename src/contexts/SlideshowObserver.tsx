import React, { createContext, useCallback, useState } from "react";
import * as R from "ramda";

interface SlideshowProviderProps {
  children: React.ReactNode;
}

interface SlideshowObserver {
  entries: Array<HTMLElement | SVGSVGElement>;
  observe: (target: HTMLElement | SVGSVGElement) => void;
  disconnect: () => void;
}

const SLIDESHOW_CONTEXT_INITIAL_STATE = {
  entries: [],
  observe: (): void => undefined,
  disconnect: (): void => undefined,
};

export const SlideshowObserver = createContext<SlideshowObserver>(
  SLIDESHOW_CONTEXT_INITIAL_STATE
);

export const SlideshowObserverProvider: React.FC<SlideshowProviderProps> = ({
  children,
}: SlideshowProviderProps) => {
  const [entries, setEntries] = useState<Array<HTMLElement | SVGSVGElement>>(
    []
  );
  const disconnect = useCallback(() => setEntries([]), []);
  const observe = useCallback(
    (target: HTMLElement | SVGSVGElement) => {
      const includesEntry = R.includes(R.__, entries);
      const addEntry = (e: HTMLElement | SVGSVGElement) =>
        R.pipe(R.append(e), setEntries)(entries);

      R.unless(includesEntry, addEntry)(target);
    },
    [entries]
  );

  const contextValue = { entries, disconnect, observe };

  return (
    <SlideshowObserver.Provider value={contextValue}>
      {children}
    </SlideshowObserver.Provider>
  );
};
