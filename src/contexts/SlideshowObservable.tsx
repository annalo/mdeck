import React from "react";

import { CodeLineObserverProvider } from "./CodeLineObserver";
import { SlideObserverProvider } from "./SlideObserver";

interface SlideshowObservableProps {
  children: React.ReactNode;
}

const SlideshowObservable: React.FC<SlideshowObservableProps> = ({
  children,
}: SlideshowObservableProps) => (
  <SlideObserverProvider>
    <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
  </SlideObserverProvider>
);

export { SlideshowObservable };
