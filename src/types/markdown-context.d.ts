declare type HtmlArray = string[];
declare type HtmlString = string;
declare type LineNumber = number;
declare type MarkdownString = string;

declare interface MarkdownContextProviderProps {
  children: React.ReactNode;
  initialState?: MarkdownContextState;
}

declare interface MarkdownContextState {
  htmlArray: HtmlArray;
  md: MarkdownString;
  previewCodeLine: LineNumber;
  textLineNumber: LineNumber;
}
