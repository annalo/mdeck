import React, { createContext, useContext, useReducer } from "react";
import {
  MarkdownContextReducerAction as ReducerAction,
  MarkdownContextReducerActionType as ReducerActionType,
} from "types/markdown-context-reducer-action";

const MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE = {
  htmlArray: [],
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

const StateContext = createContext<MarkdownContextState | undefined>(undefined);
const DispatchContext = createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);

function reducer(state: MarkdownContextState, action: ReducerAction) {
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

const MarkdownContextProvider: React.FC<MarkdownContextProviderProps> = ({
  children,
  initialState, // optional param
}: MarkdownContextProviderProps) => {
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
      "useMarkdownDispatch must be used within a MarkdownContextProvider"
    );
  }
  return context;
}

function useMarkdownState(): MarkdownContextState {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useMarkdownState must be used within a MarkdownContextProvider"
    );
  }
  return context;
}

export {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContextProvider,
  useMarkdownDispatch,
  useMarkdownState,
};
