declare type SlideNumber = number;

declare type SlideElement = HTMLDivElement;

declare interface SlideObserverEntries {
  [slideNumber: SlideNumber]: SlideElement;
}

declare function SlideObserverObserve({
  slideNumber: SlideNumber,
  node: SlideElement,
}): void;

declare function SlideObserverUnobserve(slideNumber: SlideNumber): void;

declare interface SlideObserverProviderProps {
  children: React.ReactNode;
}

declare interface SlideObserverContext {
  entries: SlideObserverEntries;
  observe: SlideObserverObserve;
  unobserve: SlideObserverUnobserve;
}
