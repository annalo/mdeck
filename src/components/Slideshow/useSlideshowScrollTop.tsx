import { useState, useEffect } from "react";

type Listener = (number) => void;

let listeners: Array<Listener> = [];
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
    return () => {
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  }, []);

  return [scrollTop, setScrollTop];
}
