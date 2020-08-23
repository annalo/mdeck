import { useState, useEffect } from "react";

type Listener = (number) => void;

const listeners: Array<Listener> = [];
let scrollTop = 0;

const setScrollTop: (number) => void = (newScrollTop: number) => {
  scrollTop = newScrollTop;
  listeners.forEach((listener: Listener) => {
    listener(scrollTop);
  });
};

export function useSlideshowScrollTop(): [number, (number) => void] {
  const [, newListener] = useState();
  useEffect(() => {
    listeners.push(newListener);
  }, []);
  return [scrollTop, setScrollTop];
}
