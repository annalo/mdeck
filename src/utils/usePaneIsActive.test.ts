import { renderHook } from "@testing-library/react-hooks";
import { usePaneIsActive } from "./usePaneIsActive";

describe("usePaneIsActive", () => {
  test("should set isActive with initialValue", () => {
    const div = document.createElement("div");
    const ref = { current: div };

    const { result } = renderHook(() =>
      usePaneIsActive({ ref, initialValue: false })
    );

    expect(result.current).not.toBeTruthy();
  });
});
