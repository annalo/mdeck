import React, { useContext } from "react";
import { renderHook } from "@testing-library/react-hooks";
import {
  SlideshowObserver,
  SlideshowObserverProvider,
} from "contexts/SlideshowObserver";
import { useObserveElement } from "./useObserveElement";

describe("useObserveElement", () => {
  test("should observe ref with SlideshowObserver", () => {
    const ref = {
      current: {},
    };
    const wrapper = ({ children }) => (
      <SlideshowObserverProvider>{children}</SlideshowObserverProvider>
    );

    const { result } = renderHook(
      () => {
        const { entries } = useContext(SlideshowObserver);
        useObserveElement({ ref });
        return { entries, ref };
      },
      { wrapper }
    );

    expect(result.current.entries[0]).toBe(result.current.ref.current);
  });
});
