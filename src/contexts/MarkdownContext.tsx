import React, { createContext, useReducer } from "react";

interface MarkdownProviderProps {
  children: React.ReactNode;
}

interface MarkdownContextState {
  htmlString: string;
  md: string;
  slideshowLineNumber: number;
  textLineNumber: number;
}

const MARKDOWN_CONTEXT_INITIAL_STATE = {
  htmlString: "",
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

export const MarkdownContextProvider: React.FC<MarkdownProviderProps> = ({
  children,
}: MarkdownProviderProps) => {
  const reducer = (
    state,
    { type, htmlString, md, slideshowLineNumber, textLineNumber }
  ) => {
    switch (type) {
      case "setHtmlString":
        return { ...state, htmlString };
      case "setMd":
        return { ...state, md };
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
