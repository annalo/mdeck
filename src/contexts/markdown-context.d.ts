declare namespace MarkdownContext {
  declare interface ProviderProps {
    children: React.ReactNode;
  }

  declare interface State {
    htmlString: string;
    md: string;
    slideshowLineNumber: number;
    textLineNumber: number;
  }

  const enum ReducerActionType {
    SetHtmlString = "SET_HTML_STRING",
    SetMd = "SET_MD",
    SetSlideshowLineNumber = "SET_SLIDESHOW_LINE_NUMBER",
    SetTextLineNumber = "SET_TEXT_LINE_NUMBER",
  }

  declare type ReducerAction =
    | {
        type: ReducerActionType.SetHtmlString;
        htmlString: string;
      }
    | { type: ReducerActionType.SetMd; md: string }
    | {
        type: ReducerActionType.SetSlideshowLineNumber;
        slideshowLineNumber: number;
      }
    | {
        type: ReducerActionType.SetTextLineNumber;
        textLineNumber: number;
      };
}
