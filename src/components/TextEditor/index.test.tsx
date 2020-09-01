import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { TextEditor } from ".";

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
});
