type MarkdownContextReducerActionType = import("./enums").MarkdownContextReducerActionType;
console.log(MarkdownContextReducerActionType);
declare interface MarkdownContextProviderProps {
  children: React.ReactNode;
}

declare interface MarkdownContextState {
  htmlString: string;
  md: string;
  slideshowLineNumber: number;
  textLineNumber: number;
}

declare type MarkdownContextReducerAction =
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
