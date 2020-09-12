declare type CodeLine = number;
declare type CodeLineElement = Element;

declare interface CodeLineObserverEntries {
  [codeLine: CodeLine]: CodeLineElement;
}

declare function CodeLineObserverObserve({
  codeLine: CodeLine,
  element: CodeLineElement,
}): void;

declare interface CodeLineObserverProviderProps {
  children: React.ReactNode;
  initialEntries?: CodeLineObserverEntries;
}

declare interface CodeLineObserverContext {
  entries: CodeLineObserverEntries;
  observe: CodeLineObserverObserve;
}
