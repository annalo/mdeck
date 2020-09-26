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
      previewCodeLine: LineNumber;
    }
  | {
      type: MarkdownContextReducerActionType.SetTextLineNumber;
      textLineNumber: LineNumber;
    };
