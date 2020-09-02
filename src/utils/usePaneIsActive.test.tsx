import React, { useRef } from "react";
import { renderHook } from "@testing-library/react-hooks";

import { usePaneIsActive } from "./usePaneIsActive";

describe("usePaneIsActive", () => {
  test("should set isActive with initialValue", () => {
    let ref;
    const TestComponent = () => {
      ref = useRef();
      return <div ref={ref} id="test" />;
    };
    const wrapper = () => <TestComponent />;

    const { result } = renderHook(
      () => usePaneIsActive({ ref, initialValue: false }),
      { wrapper }
    );

    expect(result.current).not.toBeTruthy();
  });
});
