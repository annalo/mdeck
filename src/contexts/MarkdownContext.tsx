import React, { createContext, useContext, useReducer } from "react";
import type {
  MarkdownContextState as MarkdownContextStateType,
  MarkdownContextReducerAction,
  MarkdownContextProviderProps,
} from "types/markdown-context";
import { MarkdownContextReducerActionType } from "types/markdown-context";

const MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE = {
  htmlArray: [],
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

const MarkdownStateContext = createContext<MarkdownContextStateType>(
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
);
const MarkdownDispatchContext = createContext<
  React.Dispatch<MarkdownContextReducerAction>
>(() => null);

function markdownReducer(
  state: MarkdownContextStateType,
  action: MarkdownContextReducerAction
) {
  switch (action.type) {
    case MarkdownContextReducerActionType.SetHtmlArray: {
      return { ...state, htmlArray: action.htmlArray };
    }
    case MarkdownContextReducerActionType.SetMd: {
      return { ...state, md: action.md };
    }
    case MarkdownContextReducerActionType.SetSlideshowLineNumber: {
      return { ...state, slideshowLineNumber: action.slideshowLineNumber };
    }
    case MarkdownContextReducerActionType.SetTextLineNumber: {
      return { ...state, textLineNumber: action.textLineNumber };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MarkdownProvider: React.FC<MarkdownContextProviderProps> = ({
  children,
  initialState, // optional param
}: MarkdownContextProviderProps) => {
  const [state, dispatch] = useReducer(
    markdownReducer,
    initialState || MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
  );
  return (
    <MarkdownStateContext.Provider value={state}>
      <MarkdownDispatchContext.Provider value={dispatch}>
        {children}
      </MarkdownDispatchContext.Provider>
    </MarkdownStateContext.Provider>
  );
};

function useMarkdownDispatch(): React.Dispatch<MarkdownContextReducerAction> {
  const context = useContext(MarkdownDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useMarkdownDispatch must be used within a MarkdownProvider"
    );
  }
  return context;
}

function useMarkdownState(): MarkdownContextStateType {
  const context = useContext(MarkdownStateContext);
  if (context === undefined) {
    throw new Error("useMarkdownState must be used within a MarkdownProvider");
  }
  return context;
}

export {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownProvider,
  useMarkdownDispatch,
  useMarkdownState,
};
