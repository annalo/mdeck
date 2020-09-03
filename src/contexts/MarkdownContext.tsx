import React, { createContext, useReducer } from "react";
import type {
  MarkdownContextProviderProps,
  MarkdownContextState,
  MarkdownContextReducerAction,
} from "./markdown-context";
import { MarkdownContextReducerActionType } from "./markdown-context";

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  htmlString: "",
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

export const MarkdownContext = createContext<{
  state: MarkdownContextState;
  dispatch: React.Dispatch<MarkdownContextReducerAction>;
}>({
  state: MARKDOWN_CONTEXT_INITIAL_STATE,
  dispatch: () => null,
});

export const MarkdownContextProvider: React.FC<MarkdownContextProviderProps> = ({
  children,
}: MarkdownContextProviderProps) => {
  const reducer = (
    state: MarkdownContextState,
    action: MarkdownContextReducerAction
  ) => {
    switch (action.type) {
      case MarkdownContextReducerActionType.SetHtmlString:
        return { ...state, htmlString: action.htmlString };
      case MarkdownContextReducerActionType.SetMd:
        return { ...state, md: action.md };
      case MarkdownContextReducerActionType.SetSlideshowLineNumber:
        return { ...state, slideshowLineNumber: action.slideshowLineNumber };
      case MarkdownContextReducerActionType.SetTextLineNumber:
        return { ...state, textLineNumber: action.textLineNumber };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, MARKDOWN_CONTEXT_INITIAL_STATE);
  const contextValue = { state, dispatch };

  return (
    <MarkdownContext.Provider value={contextValue}>
      {children}
    </MarkdownContext.Provider>
  );
};
