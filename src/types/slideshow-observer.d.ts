declare namespace SlideshowObserver {
  declare interface Entries {
    [key: number]: Element;
  }

  declare type Observe = (node: Element) => void;
}
