import React, { createContext, useState } from "react";

interface SlideshowProviderProps {
  children: React.ReactElement;
}

interface SlideshowContext {
  entries: HTMLElement[];
  observe: (target: HTMLElement) => void;
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
  const [entries, setEntries] = useState<Array<HTMLElement>>([]);

  const observe = (target: HTMLElement) => {
    if (entries.includes(target)) return;
    setEntries([...entries, target]);
  };

  const disconnect = () => setEntries([]);

  const contextValue = { entries, observe, disconnect };

  return (
    <SlideshowContext.Provider value={contextValue}>
      {children}
    </SlideshowContext.Provider>
  );
};
