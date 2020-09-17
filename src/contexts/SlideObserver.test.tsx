import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  SlideObserverProvider,
  useSlideEntries,
  useSlideObserver,
} from "./SlideObserver";

describe("SlideObserver", () => {
  describe("useSlideEntries", () => {
    test("should return entries", () => {
      const slideElement1 = document.createElement("svg");
      const slideElement2 = document.createElement("svg");
      const slideElement3 = document.createElement("svg");
      const initialEntries = {
        1: slideElement1,
        2: slideElement2,
        3: slideElement3,
      };

      const wrapper = ({ children }) => (
        <SlideObserverProvider initialEntries={initialEntries}>
          {children}
        </SlideObserverProvider>
      );
      const { result } = renderHook(() => useSlideEntries(), { wrapper });
      expect(result.current).toMatchObject(initialEntries);
    });

    test("should return Error if not used within a SlideObserverProvider", () => {
      const { result } = renderHook(() => useSlideEntries());
      expect(result.error).toEqual(
        Error("useSlideEntries must be used within a SlideObserverProvider")
      );
    });
  });

  describe("useSlideObserver", () => {
    test("should observe a slide", () => {
      const wrapper = ({ children }) => (
        <SlideObserverProvider>{children}</SlideObserverProvider>
      );
      const { result } = renderHook(
        () => {
          const entries = useSlideEntries();
          const { observe } = useSlideObserver();
          return { entries, observe };
        },
        { wrapper }
      );
      expect(result.current.entries).toMatchObject({});

      const slideNumber = 1;
      const slideElement = document.createElement("svg");
      act(() => result.current.observe(slideNumber, slideElement));
      expect(result.current.entries[slideNumber]).toMatchObject(slideElement);
    });

    test("should unobserve a slide", () => {
      const slideNumber = 1;
      const slideElement = document.createElement("svg");
      const initialEntries = { [slideNumber]: slideElement };
      const wrapper = ({ children }) => (
        <SlideObserverProvider initialEntries={initialEntries}>
          {children}
        </SlideObserverProvider>
      );

      const { result } = renderHook(
        () => {
          const entries = useSlideEntries();
          const { unobserve } = useSlideObserver();
          return { entries, unobserve };
        },
        { wrapper }
      );
      expect(result.current.entries).toMatchObject(initialEntries);

      act(() => result.current.unobserve(slideNumber));
      expect(result.current.entries).toMatchObject({});
    });

    test("should return Error if not used within a SlideObserverProvider", () => {
      const { result } = renderHook(() => useSlideObserver());
      expect(result.error).toEqual(
        Error("useSlideObserver must be used within a SlideObserverProvider")
      );
    });
  });
});
