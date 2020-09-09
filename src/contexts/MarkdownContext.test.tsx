import React, { useContext } from "react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContext,
  MarkdownContextProvider,
} from "./MarkdownContext";

describe("MarkdownContext", () => {
  test("should provide default initial state value", () => {
    const wrapper = ({ children }) => (
      <MarkdownContextProvider>{children}</MarkdownContextProvider>
    );
    const { result } = renderHook(
      () => {
        const { state } = useContext(MarkdownContext);
        return state;
      },
      { wrapper }
    );

    expect(result.current).toMatchObject(
      MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
    );
  });

  describe("<MarkdownContextProvider />", () => {
    test("should set MarkdownContext with 'initialState' if provided", () => {
      const initialState = {
        htmlArray: ["1", "2"],
        md: "123",
        slideshowLineNumber: 5,
        textLineNumber: 5,
      };
      const wrapper = ({ children }) => (
        <MarkdownContextProvider initialState={initialState}>
          {children}
        </MarkdownContextProvider>
      );
      const { result } = renderHook(
        () => {
          const { state } = useContext(MarkdownContext);
          return state;
        },
        { wrapper }
      );

      expect(result.current).toMatchObject(initialState);
    });
  });
});
