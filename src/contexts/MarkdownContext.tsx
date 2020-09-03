import React, { createContext, useReducer } from "react";

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  htmlString: "",
  md: "",
  slideshowLineNumber: 0,
  textLineNumber: 0,
};

export const MarkdownContext = createContext<{
  state: MarkdownContext.State;
  dispatch: React.Dispatch<any>;
}>({
  state: MARKDOWN_CONTEXT_INITIAL_STATE,
  dispatch: () => null,
});

export const MarkdownContextProvider: React.FC<MarkdownContext.ProviderProps> = ({
  children,
}: MarkdownContext.ProviderProps) => {
  const reducer = (
    state,
    { type, htmlString, md, slideshowLineNumber, textLineNumber }
  ) => {
    switch (type) {
      case "SET_HTML_STRING":
        return { ...state, htmlString };
      case "SET_MD":
        return { ...state, md };
      case "SET_SLIDESHOW_LINE_NUMBER":
        return { ...state, slideshowLineNumber };
      case "SET_TEXT_LINE_NUMBER":
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
