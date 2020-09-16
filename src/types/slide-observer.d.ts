declare type SlideNumber = number;
declare type SlideElement = HTMLElement;

declare namespace SlideObserver {
  declare interface Entries {
    [slideNumber: SlideNumber]: SlideElement;
  }

  declare type Observe = (
    slideNumber: SlideNumber,
    targetElement: SlideElement
  ) => void;

  declare type Unobserve = (slideNumber: SlideNumber) => void;

  declare interface ProviderProps {
    children: ReactNode;
    initialEntries?: Entries;
  }

  declare interface Observer {
    observe: Observe;
    unobserve: Unobserve;
  }
}
