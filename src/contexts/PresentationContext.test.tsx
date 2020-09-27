import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  PresentationContextProvider,
  usePresentationState,
  usePresentationActions,
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

  describe("usePresentationActions", () => {
    describe("present", () => {
      test("should set isPresented to true", () => {
        const { result } = renderHook(
          () => {
            const isPresented = usePresentationState();
            const { present } = usePresentationActions();

            return { isPresented, present };
          },
          { wrapper }
        );

        expect(result.current.isPresented).not.toBeTruthy();
        act(() => result.current.present());
        expect(result.current.isPresented).toBeTruthy();
      });
    });

    describe("dismiss", () => {
      test("should toggle isPresented", () => {
        const { result } = renderHook(
          () => {
            const isPresented = usePresentationState();
            const { dismiss, present } = usePresentationActions();
            return { isPresented, dismiss, present };
          },
          { wrapper }
        );

        act(() => result.current.present());
        expect(result.current.isPresented).toBeTruthy();
        act(() => result.current.dismiss());
        expect(result.current.isPresented).not.toBeTruthy();
      });
    });

    test("should return Error if not used within a PresentationContextProvider", () => {
      const { result } = renderHook(() => usePresentationActions());
      expect(result.error).toEqual(
        Error(
          "usePresentationActions must be used within a PresentationContextProvider"
        )
      );
    });
  });
});
