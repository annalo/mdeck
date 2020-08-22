import React, { createContext, useReducer } from "react";
import { parse } from "utils/parse";

interface MarkdownProviderProps {
  children: React.ReactElement[];
}

interface MarkdownContextInitialState {
  activePane: string;
  html: string;
  previewLineNumber: number;
  textLineNumber: number;
  lineNumber: number;
  md: string;
}

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  activePane: "",
  html: "",
  previewLineNumber: 0,
  textLineNumber: 0,
  lineNumber: 0,
  md: "",
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
  function reducer(
    state,
    { type, activePane, textLineNumber, previewLineNumber, lineNumber, md }
  ) {
    switch (type) {
      case "setActivePane":
        return { ...state, activePane };
      case "setTextLineNumber":
        return { ...state, textLineNumber };
      case "setPreviewLineNumber":
        return { ...state, previewLineNumber };
      case "setLineNumber":
        return { ...state, lineNumber };
      case "setMd":
        return { ...state, html: parse(md), md };
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
