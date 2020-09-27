import React, { createContext, useContext, useState } from "react";

const PRESENTATION_DEFAULT_STATE = false;

const PresentationStateContext = createContext<
  PresentationContext.IsPresented | undefined
>(undefined);
const TogglePresentationContext = createContext<
  PresentationContext.TogglePresentation | undefined
>(undefined);

const PresentationContextProvider: React.FC<PresentationContext.ProviderProps> = ({
  children,
}: PresentationContext.ProviderProps) => {
  const [isPresented, togglePresentation] = useState<
    PresentationContext.IsPresented
  >(PRESENTATION_DEFAULT_STATE);

  return (
    <PresentationStateContext.Provider value={isPresented}>
      <TogglePresentationContext.Provider value={togglePresentation}>
        {children}
      </TogglePresentationContext.Provider>
    </PresentationStateContext.Provider>
  );
};

function usePresentationState(): PresentationContext.IsPresented {
  const context = useContext(PresentationStateContext);
  if (context === undefined) {
    throw new Error(
      "usePresentationState must be used within a PresentationContextProvider"
    );
  }
  return context;
}

function useTogglePresentation(): PresentationContext.TogglePresentation {
  const context = useContext(TogglePresentationContext);
  if (context === undefined) {
    throw new Error(
      "useTogglePresentation must be used within a PresentationContextProvider"
    );
  }
  return context;
}

export {
  PresentationContextProvider,
  usePresentationState,
  useTogglePresentation,
};
