declare type CodeLine = LineNumber;
declare type CodeLineElement = Element;

declare interface CodeLineObserverEntries {
  [codeLine: CodeLine]: CodeLineElement;
}

declare function CodeLineObserverObserve(
  targetEntries: CodeLineObserverEntries
): void;

declare interface CodeLineObserverProviderProps {
  children: React.ReactNode;
  initialEntries?: CodeLineObserverEntries;
}

declare interface CodeLineObserverContext {
  entries: CodeLineObserverEntries;
  observe: CodeLineObserverObserve;
}
