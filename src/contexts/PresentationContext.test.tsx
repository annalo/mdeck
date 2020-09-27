import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  PresentationContextProvider,
  usePresentationState,
  useTogglePresentation,
} from "./PresentationContext";

describe("PresentationContext", () => {
  const wrapper = ({ children }) => (
    <PresentationContextProvider>{children}</PresentationContextProvider>
  );

  describe("usePresentationState", () => {
    test("should return isPresented", () => {
      const { result } = renderHook(() => usePresentationState(), { wrapper });
      expect(result.current).not.toBeTruthy();
    });

    test("should return Error if not used within a PresentationContextProvider", () => {
      const { result } = renderHook(() => usePresentationState());
      expect(result.error).toEqual(
        Error(
          "usePresentationState must be used within a PresentationContextProvider"
        )
      );
    });
  });

  describe("useTogglePresentation", () => {
    test("should toggle isPresented", () => {
      const { result } = renderHook(
        () => {
          const isPresented = usePresentationState();
          const togglePresentation = useTogglePresentation();

          return { isPresented, togglePresentation };
        },
        { wrapper }
      );

      act(() => result.current.togglePresentation(true));
      expect(result.current.isPresented).toBeTruthy();

      act(() => result.current.togglePresentation(false));
      expect(result.current.isPresented).not.toBeTruthy();
    });

    test("should return Error if not used within a PresentationContextProvider", () => {
      const { result } = renderHook(() => useTogglePresentation());
      expect(result.error).toEqual(
        Error(
          "useTogglePresentation must be used within a PresentationContextProvider"
        )
      );
    });
  });
});
