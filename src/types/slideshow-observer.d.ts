declare namespace SlideshowObserver {
  declare interface Entries {
    [key: LineNumber]: Element;
  }

  declare type Observe = (node: Element) => void;
}
