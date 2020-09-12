import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  CodeLineObserverProvider,
  useCodeLineObserver,
} from "./CodeLineObserver";

describe("CodeLineObserver", () => {
  describe("useCodeLineObserver", () => {
    test("should return entries", () => {
      const element1 = document.createElement("h1");
      const element2 = document.createElement("p");
      const element3 = document.createElement("h2");
      const initialEntries = {
        1: element1,
        2: element2,
        3: element3,
      };

      const wrapper = ({ children }) => (
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      );
      const { result } = renderHook(() => useCodeLineObserver(), { wrapper });
      expect(result.current.entries).toMatchObject(initialEntries);
    });

    test("should observe entries", () => {
      const element1 = document.createElement("h1");
      const element2 = document.createElement("h3");
      const initialEntries = { 1: element1, 2: element2 };
      const wrapper = ({ children }) => (
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      );
      const { result } = renderHook(() => useCodeLineObserver(), { wrapper });

      expect(result.current.entries).toMatchObject(initialEntries);

      const newElement2 = document.createElement("p");
      const element3 = document.createElement("h2");
      const newEntries = { 2: newElement2, 3: element3 };

      act(() => result.current.observe(newEntries));

      expect(result.current.entries).toMatchObject({
        ...initialEntries,
        ...newEntries,
      });
    });

    test("should observe new code line element in place of old", () => {
      const codeLine = 1;
      const element = document.createElement("h1");
      const initialEntries = { [codeLine]: element };

      const wrapper = ({ children }) => (
        <CodeLineObserverProvider initialEntries={initialEntries}>
          {children}
        </CodeLineObserverProvider>
      );
      const { result } = renderHook(() => useCodeLineObserver(), { wrapper });

      expect(result.current.entries[codeLine]).toMatchObject(element);

      const newElement = document.createElement("p");
      const newEntries = { [codeLine]: newElement };

      act(() => result.current.observe(newEntries));

      expect(result.current.entries[codeLine]).toMatchObject(newElement);
    });

    test("should return Error if not used within a CodeLineObserverProvider", () => {
      const { result } = renderHook(() => useCodeLineObserver());
      expect(result.error).toEqual(
        Error(
          "useCodeLineObserver must be used within a CodeLineObserverProvider"
        )
      );
    });
  });
});
