import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContextProvider,
  useMarkdownDispatch,
  useMarkdownState,
} from "./MarkdownContext";

describe("MarkdownContext", () => {
  describe("<MarkdownContextProvider />", () => {
    test("should set MarkdownContext with 'initialState' if provided", () => {
      const initialState = {
        htmlArray: ["1", "2"],
        md: "123",
        previewCodeLine: 5,
        textLineNumber: 5,
      };
      const wrapper = ({ children }) => (
        <MarkdownContextProvider initialState={initialState}>
          {children}
        </MarkdownContextProvider>
      );
      const { result } = renderHook(() => useMarkdownState(), { wrapper });

      expect(result.current).toMatchObject(initialState);
    });
  });

  describe("useMarkdownDispatch", () => {
    test("should return Error if not used within a MarkdownContextProvider", () => {
      const { result } = renderHook(() => useMarkdownDispatch());
      expect(result.error).toEqual(
        Error(
          "useMarkdownDispatch must be used within a MarkdownContextProvider"
        )
      );
    });
  });

  describe("useMarkdownState", () => {
    test("should return state from StateContext", () => {
      const wrapper = ({ children }) => (
        <MarkdownContextProvider>{children}</MarkdownContextProvider>
      );
      const { result } = renderHook(() => useMarkdownState(), { wrapper });
      expect(result.current).toMatchObject(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
      );
    });

    test("should return Error if not used within a MarkdownContextProvider", () => {
      const { result } = renderHook(() => useMarkdownState());
      expect(result.error).toEqual(
        Error("useMarkdownState must be used within a MarkdownContextProvider")
      );
    });
  });
});
