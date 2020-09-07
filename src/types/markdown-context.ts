export declare interface MarkdownContextProviderProps {
  children: React.ReactNode;
}

export declare interface MarkdownContextState {
  htmlArray: HtmlArray;
  md: MarkdownString;
  slideshowLineNumber: LineNumber;
  textLineNumber: LineNumber;
}

export enum MarkdownContextReducerActionType {
  SetHtmlArray = "SET_HTML_STRING",
  SetMd = "SET_MD",
  SetSlideshowLineNumber = "SET_SLIDESHOW_LINE_NUMBER",
  SetTextLineNumber = "SET_TEXT_LINE_NUMBER",
}

export declare type MarkdownContextReducerAction =
  | {
      type: MarkdownContextReducerActionType.SetHtmlArray;
      htmlArray: HtmlArray;
    }
  | {
      type: MarkdownContextReducerActionType.SetMd;
      md: MarkdownString;
    }
  | {
      type: MarkdownContextReducerActionType.SetSlideshowLineNumber;
      slideshowLineNumber: LineNumber;
    }
  | {
      type: MarkdownContextReducerActionType.SetTextLineNumber;
      textLineNumber: LineNumber;
    };
