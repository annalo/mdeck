import React, { createContext, useContext, useState } from "react";

const PRESENTATION_DEFAULT_STATE = false;

const PresentationStateContext = createContext<
  PresentationContext.IsPresented | undefined
>(undefined);
const PresentationActionsContext = createContext<
  PresentationContext.PresentationActions | undefined
>(undefined);

const PresentationContextProvider: React.FC<PresentationContext.ProviderProps> = ({
  children,
  initialState,
}: PresentationContext.ProviderProps) => {
  const [isPresented, setIsPresented] = useState<
    PresentationContext.IsPresented
  >(initialState || PRESENTATION_DEFAULT_STATE);

  const dismiss = () => setIsPresented(false);
  const present = () => setIsPresented(true);
  const presentationActions = { dismiss, present };

  return (
    <PresentationStateContext.Provider value={isPresented}>
      <PresentationActionsContext.Provider value={presentationActions}>
        {children}
      </PresentationActionsContext.Provider>
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

function usePresentationActions(): PresentationContext.PresentationActions {
  const context = useContext(PresentationActionsContext);
  if (context === undefined) {
    throw new Error(
      "usePresentationActions must be used within a PresentationContextProvider"
    );
  }
  return context;
}

export {
  PresentationContextProvider,
  usePresentationState,
  usePresentationActions,
};
