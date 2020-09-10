import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownProvider,
  useMarkdownDispatch,
  useMarkdownState,
} from "./MarkdownContext";

describe("MarkdownContext", () => {
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

  describe("useMarkdownDispatch", () => {
    test("should return Error if not used within a MarkdownProvider", () => {
      const { result } = renderHook(() => useMarkdownDispatch());
      expect(result.error).toEqual(
        Error("useMarkdownDispatch must be used within a MarkdownProvider")
      );
    });
  });

  describe("useMarkdownState", () => {
    test("should return state from StateContext", () => {
      const wrapper = ({ children }) => (
        <MarkdownProvider>{children}</MarkdownProvider>
      );
      const { result } = renderHook(() => useMarkdownState(), { wrapper });
      expect(result.current).toMatchObject(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE
      );
    });

    test("should return Error if not used within a MarkdownProvider", () => {
      const { result } = renderHook(() => useMarkdownState());
      expect(result.error).toEqual(
        Error("useMarkdownState must be used within a MarkdownProvider")
      );
    });
  });
});
