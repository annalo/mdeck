declare type CodeLine = LineNumber;
declare type CodeLineElement = Element;

declare namespace CodeLineObserver {
  declare interface Entries {
    [codeLine: CodeLine]: CodeLineElement;
  }

  declare type Observe = (targetEntries: Entries) => void;

  declare interface ProviderProps {
    children: React.ReactNode;
    initialEntries?: Entries;
  }

  declare interface Observer {
    observe: Observe;
  }
}
