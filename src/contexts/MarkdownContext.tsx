import React, { createContext, useContext, useReducer } from "react";
import type {
  MarkdownContextState as State,
  MarkdownContextReducerAction as ReducerAction,
  MarkdownContextProviderProps as ProviderProps,
} from "types/markdown-context";
import { MarkdownContextReducerActionType as ReducerActionType } from "types/markdown-context";

const MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE = {
  htmlArray: [],
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);

function reducer(state: State, action: ReducerAction) {
  switch (action.type) {
    case ReducerActionType.SetHtmlArray: {
      return { ...state, htmlArray: action.htmlArray };
    }
    case ReducerActionType.SetMd: {
      return { ...state, md: action.md };
    }
    case ReducerActionType.SetSlideshowLineNumber: {
      return { ...state, slideshowLineNumber: action.slideshowLineNumber };
    }
    case ReducerActionType.SetTextLineNumber: {
      return { ...state, textLineNumber: action.textLineNumber };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MarkdownProvider: React.FC<ProviderProps> = ({
  children,
  initialState, // optional param
}: ProviderProps) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState || MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
  );
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

function useMarkdownDispatch(): React.Dispatch<ReducerAction> {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      "useMarkdownDispatch must be used within a MarkdownProvider"
    );
  }
  return context;
}

function useMarkdownState(): State {
  const context = useContext(StateContext);
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
