import React, { createContext, useReducer } from "react";
import { parse } from "utils/parse";

interface MarkdownProviderProps {
  children: React.ReactElement[];
}

interface MarkdownContextInitialState {
  html: string;
  md: string;
  previewLineNumber: number;
  textLineNumber: number;
}

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  html: "",
  md: "",
  previewLineNumber: 0,
  textLineNumber: 0,
};

export const MarkdownContext = createContext<{
  state: MarkdownContextInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: MARKDOWN_CONTEXT_INITIAL_STATE,
  dispatch: () => null,
});

export const MarkdownProvider: React.FC<MarkdownProviderProps> = ({
  children,
}: MarkdownProviderProps) => {
  function reducer(state, { type, textLineNumber, previewLineNumber, md }) {
    switch (type) {
      case "setMd":
        return { ...state, html: parse(md), md };
      case "setTextLineNumber":
        return { ...state, textLineNumber };
      case "setPreviewLineNumber":
        return { ...state, previewLineNumber };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, MARKDOWN_CONTEXT_INITIAL_STATE);
  const context = { state, dispatch };

  return (
    <MarkdownContext.Provider value={context}>
      {children}
    </MarkdownContext.Provider>
  );
};
