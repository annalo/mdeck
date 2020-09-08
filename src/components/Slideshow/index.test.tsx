import React from "react";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import { Slideshow } from ".";
import { useObservable } from "./useObservable";
import { useSyncSlideshow } from "./useSyncSlideshow";

jest.mock("smooth-scroll-into-view-if-needed");
afterEach(() => jest.clearAllMocks());

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("useObservable", () => {
    test("should observe and return entries", () => {
      /* Create element with data-line for observer to pick up */
      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      h1.className = CODE_LINE_CLASS_NAME;
      h1.setAttribute(DATA_LINE_ATTRIBUTE, "0");
      div.appendChild(h1);

      const { result } = renderHook(() => useObservable());

      expect(result.current.entries).toMatchObject({});

      act(() => result.current.observe(div));

      expect(result.current.entries).toMatchObject({ 0: h1 });
    });
  });

  describe("useSyncSlideshow", () => {
    test("should sync slideshow to textLineNumber if there's an element with the data-line", () => {
      const textLineNumber = 2;
      const element = { test: "test" };
      const entries = { 2: element };

      renderHook(() => useSyncSlideshow({ entries, textLineNumber }));

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith(element, { block: "start" });
    });

    test("should not do anything if there is no element with the data-line", () => {
      const textLineNumber = 5;
      const entries = { 2: {} };

      renderHook(() => useSyncSlideshow({ entries, textLineNumber }));

      expect(scrollIntoView).not.toHaveBeenCalled();
    });
  });
});
