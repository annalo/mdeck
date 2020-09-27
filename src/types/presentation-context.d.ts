declare namespace PresentationContext {
  type IsPresented = boolean;

  type Dismiss = () => void;
  type Present = () => void;
  interface PresentationActions {
    dismiss: Dismiss;
    present: Present;
  }

  declare interface ProviderProps {
    children: ReactNode;
  }
}
