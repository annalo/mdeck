import React, { createContext, useReducer } from "react";
import { parse } from "utils/parse";

interface MarkdownProviderProps {
  children: React.ReactElement[];
}

interface MarkdownContextState {
  html: string;
  md: string;
  slideshowLineNumber: number;
  textLineNumber: number;
}

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  html: "",
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

export const MarkdownContext = createContext<{
  state: MarkdownContextState;
  dispatch: React.Dispatch<any>;
}>({
  state: MARKDOWN_CONTEXT_INITIAL_STATE,
  dispatch: () => null,
});

export const MarkdownProvider: React.FC<MarkdownProviderProps> = ({
  children,
}: MarkdownProviderProps) => {
  const reducer = (
    state,
    { type, md, slideshowLineNumber, textLineNumber }
  ) => {
    switch (type) {
      case "setMd":
        return { ...state, html: parse(md), md };
      case "setSlideshowLineNumber":
        return { ...state, slideshowLineNumber };
      case "setTextLineNumber":
        return { ...state, textLineNumber };
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
