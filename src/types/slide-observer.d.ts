declare type SlideNumber = number;
declare type SlideElement = HTMLDivElement;

declare namespace SlideObserver {
  declare interface Entries {
    [slideNumber: SlideNumber]: SlideElement;
  }

  declare function Observe({
    slideNumber: SlideNumber,
    targetElement: SlideElement,
  }): void;

  declare function Unobserve(slideNumber: SlideNumber): void;

  declare interface ProviderProps {
    children: ReactNode;
    initialEntries?: Entries;
  }

  declare interface Observer {
    observe: Observe;
    unobserve: Unobserve;
  }
}
