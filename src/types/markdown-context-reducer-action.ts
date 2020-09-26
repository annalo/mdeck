export enum MarkdownContextReducerActionType {
  SetHtmlArray = "SET_HTML_STRING",
  SetMd = "SET_MD",
  SetPreviewCodeLine = "SET_PREVIEW_CODE_LINE",
  SetEditorLine = "SET_TEXT_LINE_NUMBER",
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
      type: MarkdownContextReducerActionType.SetPreviewCodeLine;
      previewCodeLine: LineNumber;
    }
  | {
      type: MarkdownContextReducerActionType.SetEditorLine;
      editorLine: LineNumber;
    };
