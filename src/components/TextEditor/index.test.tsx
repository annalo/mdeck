import React, { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import {
  MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE,
  MarkdownContext,
  MarkdownContextProvider,
} from "contexts/MarkdownContext2";
import { TEXT_AREA_LINE_HEIGHT, TextEditor } from ".";
import { useSyncTextArea } from "./useSyncTextArea";
import { useTrackTextAreaScroll } from "./useTrackTextAreaScroll";

describe("<TextEditor />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<TextEditor />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should set md on textarea change", () => {
    render(
      <MarkdownContextProvider>
        <TextEditor />
      </MarkdownContextProvider>
    );
    const textarea = screen.getByRole("textbox");

    expect(textarea.textContent).toBe("");
    userEvent.type(textarea, "# Hello World!");
    expect(textarea).toHaveValue("# Hello World!");
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

    const wrapper = ({ children }) => (
      <MarkdownContextProvider>{children}</MarkdownContextProvider>
    );

    test("should set textLineNumber to the top most visible line number on scroll if isActive", () => {
      const ref = { current: textarea };
      const { result } = renderHook(
        () => {
          const { dispatch, state } = useContext(MarkdownContext);
          useTrackTextAreaScroll({
            dispatch,
            isActive: true,
            ref,
            textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
          });
          return state;
        },
        { wrapper }
      );

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
      const { result } = renderHook(
        () => {
          const { dispatch, state } = useContext(MarkdownContext);
          useTrackTextAreaScroll({
            dispatch,
            isActive: false,
            ref,
            textAreaLineHeight: TEXT_AREA_LINE_HEIGHT,
          });
          return state;
        },
        { wrapper }
      );

      act(() => {
        fireEvent.scroll(textarea, { target: { scrollTop: scrollHeight } });
      });

      expect(result.current.textLineNumber).toBe(
        MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.textLineNumber
      );
    });
  });
});
