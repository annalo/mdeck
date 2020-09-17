import React from "react";
import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownProvider,
} from "contexts/MarkdownContext";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";
import { SlideObserverProvider } from "contexts/SlideObserver";

import {
  INITIAL_SLIDE_NUMBER,
  useSlideNavigation,
} from "./usePresentationSlideNavigation";

jest.mock("smooth-scroll-into-view-if-needed");

afterEach(() => jest.clearAllMocks());

describe("usePresentationSlideNavigation", () => {
  const htmlArray = [
    "<svg data-line='1'>Slide 1</svg>",
    "<svg data-line='2'>Slide 2</svg>",
  ];
  const slideEntries = { 1: htmlArray[0], 2: htmlArray[1] };
  const wrapper = ({ children }) => (
    <MarkdownProvider
      initialState={{ ...MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE, htmlArray }}
    >
      <SlideObserverProvider initialEntries={slideEntries}>
        <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
      </SlideObserverProvider>
    </MarkdownProvider>
  );

  test("should start slideNumber on INITIAL_SLIDE_NUMBER", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should reset slideNumber when isActive updates", () => {
    let isActive = true;
    const { rerender, result } = renderHook(
      () => useSlideNavigation(isActive),
      {
        wrapper,
      }
    );
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER + 1);

    isActive = false;
    rerender();
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should scroll slide into view when slideNumber updates", async () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(scrollIntoView.mock.calls).toEqual([
      [slideEntries[result.current - 1]],
      [slideEntries[result.current]],
    ]);
  });

  test("should not scroll slide into view when is not active", () => {
    const isActive = false;
    renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  test("should not listen to keydown when not active", () => {
    const isActive = false;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should not set slideNumber to less than INITIAL_SLIDE_NUMBER", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowLeft", keyCode: 37 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should set slideNumber to next slide on ArrowRight", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER + 1);
  });

  test("should set slideNumber to next slide on ArrowDown", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER + 1);
  });

  test("should set slideNumber to previous slide on ArrowLeft", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER + 1);

    act(() => {
      fireEvent.keyDown(document, { key: "ArrowLeft", keyCode: 37 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should set slideNumber to previous slide on ArrowUp", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER + 1);

    act(() => {
      fireEvent.keyDown(document, { key: "ArrowUp", keyCode: 38 });
    });
    expect(result.current).toBe(INITIAL_SLIDE_NUMBER);
  });

  test("should not set slideNumber to more than slide count", () => {
    const isActive = true;
    const { result } = renderHook(() => useSlideNavigation(isActive), {
      wrapper,
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    act(() => {
      fireEvent.keyDown(document, { key: "ArrowRight", keyCode: 39 });
    });
    expect(result.current).toBe(htmlArray.length);
  });
});
