export declare interface MarkdownContextProviderProps {
  children: React.ReactNode;
}

export declare interface MarkdownContextState {
  htmlString: string;
  md: string;
  slideshowLineNumber: number;
  textLineNumber: number;
}

export enum MarkdownContextReducerActionType {
  SetHtmlString = "SET_HTML_STRING",
  SetMd = "SET_MD",
  SetSlideshowLineNumber = "SET_SLIDESHOW_LINE_NUMBER",
  SetTextLineNumber = "SET_TEXT_LINE_NUMBER",
}

export declare type MarkdownContextReducerAction =
  | {
      type: MarkdownContextReducerActionType.SetHtmlString;
      htmlString: string;
    }
  | {
      type: MarkdownContextReducerActionType.SetMd;
      md: string;
    }
  | {
      type: MarkdownContextReducerActionType.SetSlideshowLineNumber;
      slideshowLineNumber: number;
    }
  | {
      type: MarkdownContextReducerActionType.SetTextLineNumber;
      textLineNumber: number;
    };
