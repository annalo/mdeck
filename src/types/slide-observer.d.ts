declare type SlideNumber = number;
declare type SlideElement = HTMLElement;

declare namespace SlideObserver {
  interface Entries {
    [slideNumber: SlideNumber]: SlideElement;
  }

  type Observe = (
    slideNumber: SlideNumber,
    targetElement: SlideElement
  ) => void;

  type Unobserve = (slideNumber: SlideNumber) => void;

  interface ProviderProps {
    children: ReactNode;
    initialEntries?: Entries;
  }

  interface Observer {
    observe: Observe;
    unobserve: Unobserve;
  }
}
