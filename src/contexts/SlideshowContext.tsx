import React, { createContext, useCallback, useState } from "react";

interface SlideshowProviderProps {
  children: React.ReactElement;
}

interface SlideshowContext {
  entries: Array<HTMLElement | SVGSVGElement>;
  observe: (target: HTMLElement | SVGSVGElement) => void;
  disconnect: () => void;
}

const SLIDESHOW_CONTEXT_INITIAL_STATE = {
  entries: [],
  observe: () => {},
  disconnect: () => {},
};

export const SlideshowContext = createContext<SlideshowContext>(
  SLIDESHOW_CONTEXT_INITIAL_STATE
);

export const SlideshowProvider: React.FC<SlideshowProviderProps> = ({
  children,
}: SlideshowProviderProps) => {
  const [entries, setEntries] = useState<Array<HTMLElement | SVGSVGElement>>(
    []
  );
  const disconnect = useCallback(() => {
    setEntries([]);
  }, []);

  const observe = useCallback(
    (target: HTMLElement | SVGSVGElement) => {
      if (entries.includes(target)) return;
      setEntries([target, ...entries]);
    },
    [entries]
  );

  const contextValue = { entries, disconnect, observe };

  return (
    <SlideshowContext.Provider value={contextValue}>
      {children}
    </SlideshowContext.Provider>
  );
};
