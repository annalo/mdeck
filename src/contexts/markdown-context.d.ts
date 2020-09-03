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

  declare type ReducerAction =
    | {
        type: import("./markdown-context-reducer-action-type").SetHtmlString;
        htmlString: string;
      }
    | {
        type: import("./markdown-context-reducer-action-type").SetMd;
        md: string;
      }
    | {
        type: import("./markdown-context-reducer-action-type").SetSlideshowLineNumber;
        slideshowLineNumber: number;
      }
    | {
        type: import("./markdown-context-reducer-action-type").SetTextLineNumber;
        textLineNumber: number;
      };
}
