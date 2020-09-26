import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { render, renderHook } from "utils/test-utils";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { Editor } from ".";
import { TEXT_AREA_LINE_HEIGHT } from "./TextArea";
import { useSyncTextArea } from "./useSyncTextArea";
import { useTrackTextAreaScroll } from "./useTrackTextAreaScroll";

describe("<Editor />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Editor />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should set md on textarea change", () => {
    render(<Editor />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveValue("");
    userEvent.type(textarea, "# Hello World!");
    expect(textarea).toHaveValue("# Hello World!");
  });

  test("should support tabs in textarea", () => {
    render(<Editor />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveValue("");

    userEvent.type(textarea, "Hello");
    fireEvent.keyDown(textarea, { key: "Tab", keyCode: 9 });
    userEvent.type(textarea, "World!");

    expect(textarea).toHaveValue("Hello\tWorld!");
  });

  describe("useSyncTextArea", () => {
    test("should sync textarea to slideshowLineNumber corresponding text", () => {
      const textarea = document.createElement("textarea");
      const ref = { current: textarea };
      const slideshowLineNumber = 7;

      renderHook(() => {
        useSyncTextArea({
          ref,
          slideshowLineNumber,
          textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
        });
      });

      expect(textarea.scrollTop).toBe(
        TEXT_AREA_LINE_HEIGHT * slideshowLineNumber
      );
    });
  });

  describe("useTrackTextAreaScroll", () => {
    let textarea;
    let lineCount;
    let scrollHeight;

    beforeEach(() => {
      // Fill textarea with lines of text to scroll
      textarea = document.createElement("textarea");
      lineCount = 7;
      scrollHeight = lineCount * TEXT_AREA_LINE_HEIGHT;
      const textValue = Array(...Array(lineCount))
        .map(() => "test")
        .join("\n");
      textarea.value = textValue;
    });

    test("should set textLineNumber to the top most visible line number on scroll if isActive", () => {
      const ref = { current: textarea };
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useTrackTextAreaScroll({
          dispatch,
          isActive: true,
          ref,
          textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
        });
        return useMarkdownState();
      });

      expect(result.current.textLineNumber).toBe(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.textLineNumber
      );

      act(() => {
        fireEvent.scroll(textarea, { target: { scrollTop: scrollHeight } });
      });

      expect(result.current.textLineNumber).toBe(lineCount);
    });

    test("should not set textLineNumber on scroll if isActive is false", () => {
      const ref = { current: textarea };
      const { result } = renderHook(() => {
        const dispatch = useMarkdownDispatch();
        useTrackTextAreaScroll({
          dispatch,
          isActive: false,
          ref,
          textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
        });
        return useMarkdownState();
      });

      act(() => {
        fireEvent.scroll(textarea, { target: { scrollTop: scrollHeight } });
      });

      expect(result.current.textLineNumber).toBe(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.textLineNumber
      );
    });
  });
});
