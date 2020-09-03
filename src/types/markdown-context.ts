export declare interface MarkdownContextProviderProps {
  children: React.ReactNode;
}

type ElementTree = React.ReactNode;

export declare interface MarkdownContextState {
  elementTree: ElementTree;
  htmlString: string;
  md: string;
  slideshowLineNumber: number;
  textLineNumber: number;
}

export const enum MarkdownContextReducerActionType {
  SetElementTree = "SET_ELEMENT_TREE",
  SetHtmlString = "SET_HTML_STRING",
  SetMd = "SET_MD",
  SetSlideshowLineNumber = "SET_SLIDESHOW_LINE_NUMBER",
  SetTextLineNumber = "SET_TEXT_LINE_NUMBER",
}

export declare type MarkdownContextReducerAction =
  | {
      type: MarkdownContextReducerActionType.SetElementTree;
      elementTree: ElementTree;
    }
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
