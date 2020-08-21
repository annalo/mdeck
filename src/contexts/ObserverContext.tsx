import React, { createContext } from "react";

interface ObserverProviderProps {
  children: React.ReactElement;
  observer: IntersectionObserver | null;
}

export const ObserverContext = createContext<IntersectionObserver | null>(null);

export const ObserverProvider: React.FC<ObserverProviderProps> = ({
  children,
  observer,
}: ObserverProviderProps) => {
  return (
    <ObserverContext.Provider value={observer}>
      {children}
    </ObserverContext.Provider>
  );
};
