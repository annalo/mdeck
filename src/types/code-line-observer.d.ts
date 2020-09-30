declare type CodeLine = LineNumber;
declare type CodeLineElement = Element;

declare namespace CodeLineObserver {
  interface Entries {
    [codeLine: CodeLine]: CodeLineElement;
  }

  type Observe = (targetEntries: Entries) => void;

  interface ProviderProps {
    children: React.ReactNode;
    initialEntries?: Entries;
  }

  interface Observer {
    observe: Observe;
  }
}
