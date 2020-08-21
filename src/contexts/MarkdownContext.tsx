import React, { createContext, useReducer } from "react";

interface MarkdownProviderProps {
  children: React.ReactElement[];
}

interface MarkdownContextInitialState {
  html: string;
  lineNumber: number;
  md: string;
}

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  html: "",
  lineNumber: 0,
  md: "",
};

export const MarkdownContext = createContext<{
  state: MarkdownContextInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: MARKDOWN_CONTEXT_INITIAL_STATE,
  dispatch: (any) => null,
});

export const MarkdownProvider: React.FC<MarkdownProviderProps> = ({
  children,
}: MarkdownProviderProps) => {
  function reducer(state, { type, html, lineNumber, md }) {
    switch (type) {
      case "setHtml":
        return { ...state, html };
      case "setLineNumber":
        return { ...state, lineNumber };
      case "setMd":
        return { ...state, md };
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
