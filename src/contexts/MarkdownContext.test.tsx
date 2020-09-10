import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownProvider,
  useMarkdownState,
} from "./MarkdownContext";

describe("MarkdownContext", () => {
  test("should provide default initial state value", () => {
    const wrapper = ({ children }) => (
      <MarkdownProvider>{children}</MarkdownProvider>
    );
    const { result } = renderHook(() => useMarkdownState(), { wrapper });

    expect(result.current).toMatchObject(
      MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
    );
  });

  describe("<MarkdownProvider />", () => {
    test("should set MarkdownContext with 'initialState' if provided", () => {
      const initialState = {
        htmlArray: ["1", "2"],
        md: "123",
        slideshowLineNumber: 5,
        textLineNumber: 5,
      };
      const wrapper = ({ children }) => (
        <MarkdownProvider initialState={initialState}>
          {children}
        </MarkdownProvider>
      );
      const { result } = renderHook(() => useMarkdownState(), { wrapper });

      expect(result.current).toMatchObject(initialState);
    });
  });
});
