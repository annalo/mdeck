import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

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

  describe("useDisconnect", () => {
    test("should disconnect all observed entries on unmount", async () => {
      let md = "test";
      const wrapper = ({ children }) => (
        <SlideshowObserverProvider>{children}</SlideshowObserverProvider>
      );

      const { result, rerender } = renderHook(
        () => {
          const { entries, disconnect, observe } = useContext(
            SlideshowObserver
          );
          useDisconnect({ disconnect, md });
          return { entries, disconnect, observe };
        },
        { wrapper }
      );

      act(() => {
        const el = document.createElement("div");
        result.current.observe(el);
      });

      md = "new";
      rerender();

      expect(result.current.entries).toHaveLength(0);
    });
  });
});
