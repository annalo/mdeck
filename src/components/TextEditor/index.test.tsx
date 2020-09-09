import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import {
  MarkdownContext,
  MarkdownContextProvider,
} from "contexts/MarkdownContext";
import { TEXT_AREA_LINE_HEIGHT, TextEditor } from ".";
import { useSyncTextArea } from "./useSyncTextArea";

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
});
