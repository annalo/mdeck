declare type SlideNumber = number;
declare type SlideElement = HTMLDivElement;

declare interface SlideObserverEntries {
  [slideNumber: SlideNumber]: SlideElement;
}

declare function SlideObserverObserve({
  slideNumber: SlideNumber,
  targetElement: SlideElement,
}): void;

declare function SlideObserverUnobserve(slideNumber: SlideNumber): void;

declare interface SlideObserverProviderProps {
  children: React.ReactNode;
  initialEntries?: SlideObserverEntries;
}

declare interface SlideObserverContext {
  entries: SlideObserverEntries;
  observe: SlideObserverObserve;
  unobserve: SlideObserverUnobserve;
}
