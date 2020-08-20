import { createContext } from "react";

export const ObserverContext = createContext<IntersectionObserver | null>(null);
