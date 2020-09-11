import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import { Presenter } from ".";
import { useNavigation } from "./useNavigation";

describe("<Presenter />", () => {
  const htmlArray = [
    "<svg><h1>Title</h1></svg>",
    "<svg><p>Paragraph</p></svg>",
  ];
  const component = <Presenter htmlArray={htmlArray} />;

  test("should render and match the snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render one slide at a time ", () => {
    const { container } = render(component);
    expect(container).toContainHTML(htmlArray[0]);
    expect(container).not.toContainHTML(htmlArray[1]);
  });

  describe("useNavigation", () => {
    test("should not set currentSlide less than 1", async () => {
      const { result } = renderHook(() => useNavigation({ slideCount: 7 }));

      expect(result.current).toBe(1);
      act(() => {
        fireEvent.keyDown(document, { key: "ArrowUp", keyCode: 38 });
      });
      expect(result.current).toBe(1);
    });

    test("should not set currentSlide more than slideCount", async () => {
      const { result } = renderHook(() => useNavigation({ slideCount: 2 }));

      expect(result.current).toBe(1);
      act(() => {
        fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
      });
      expect(result.current).toBe(2);
      act(() => {
        fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
      });
      expect(result.current).toBe(2);
    });

    test("should navigate to next slide on ArrowDown", async () => {
      const { container } = render(component);

      expect(container).toContainHTML(htmlArray[0]);

      fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });

      await waitFor(() => {
        expect(container).toContainHTML(htmlArray[1]);
        expect(container).not.toContainHTML(htmlArray[0]);
      });
    });

    test("should navigate to next slide on ArrowRight", async () => {
      const { container } = render(component);

      expect(container).toContainHTML(htmlArray[0]);

      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });

      await waitFor(() => {
        expect(container).toContainHTML(htmlArray[1]);
        expect(container).not.toContainHTML(htmlArray[0]);
      });
    });

    test("should navigate to previous slide on ArrowUp", async () => {
      const { container } = render(component);

      fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
      await waitFor(() => expect(container).toContainHTML(htmlArray[1]));

      fireEvent.keyDown(document, { key: "ArrowUp", keyCode: 38 });
      await waitFor(() => {
        expect(container).toContainHTML(htmlArray[0]);
        expect(container).not.toContainHTML(htmlArray[1]);
      });
    });

    test("should navigate to previous slide on ArrowLeft", async () => {
      const { container } = render(component);

      fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
      await waitFor(() => expect(container).toContainHTML(htmlArray[1]));

      fireEvent.keyDown(document, { key: "ArrowLeft", keyCode: 37 });
      await waitFor(() => {
        expect(container).toContainHTML(htmlArray[0]);
        expect(container).not.toContainHTML(htmlArray[1]);
      });
    });
  });
});
