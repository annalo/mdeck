declare namespace PresentationContext {
  type IsPresented = boolean;
  type TogglePresentation = (boolean) => void;

  declare interface ProviderProps {
    children: ReactNode;
  }
}
