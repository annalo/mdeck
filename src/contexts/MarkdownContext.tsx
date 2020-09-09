import React, { createContext, useReducer } from "react";
import type {
  MarkdownContextState,
  MarkdownContextReducerAction,
  MarkdownContextProviderProps,
} from "types/markdown-context";
import { MarkdownContextReducerActionType } from "types/markdown-context";

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  htmlArray: [],
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
  initialState, // optional param
}: MarkdownContextProviderProps) => {
  const reducer = (
    state: MarkdownContextState,
    action: MarkdownContextReducerAction
  ) => {
    switch (action.type) {
      case MarkdownContextReducerActionType.SetHtmlArray:
        return { ...state, htmlArray: action.htmlArray };
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

  const [state, dispatch] = useReducer(
    reducer,
    initialState || MARKDOWN_CONTEXT_INITIAL_STATE
  );
  const contextValue = { state, dispatch };

  return (
    <MarkdownContext.Provider value={contextValue}>
      {children}
    </MarkdownContext.Provider>
  );
};
