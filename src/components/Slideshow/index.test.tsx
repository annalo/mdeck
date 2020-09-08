import React from "react";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import {
  CODE_LINE_CLASS_NAME,
  DATA_LINE_ATTRIBUTE,
} from "utils/parsePlugins/injectLineNumber";
import { Slideshow } from ".";
import { useObservable } from "./useObservable";

describe("<Slideshow />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Slideshow />);
    expect(asFragment()).toMatchSnapshot();
  });

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
