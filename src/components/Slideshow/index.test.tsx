import React, { useContext, useEffect } from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import {
  SlideshowObserver,
  SlideshowObserverProvider,
} from "contexts/SlideshowObserver";

import { Slideshow } from ".";
import { useDisconnect } from "./useDisconnect";

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should disconnect all observed entries on unmount", async () => {
    let html = "test";
    const wrapper = ({ children }) => (
      <SlideshowObserverProvider>{children}</SlideshowObserverProvider>
    );

    const { result, rerender } = renderHook(
      () => {
        const { entries, disconnect, observe } = useContext(SlideshowObserver);
        useDisconnect({ disconnect, html });
        return { entries, disconnect, observe };
      },
      { wrapper }
    );

    act(() => {
      result.current.observe(1);
    });

    html = "new";
    rerender();

    expect(result.current.entries).toHaveLength(0);
  });
});
