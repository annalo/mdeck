import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MarkdownProvider } from "contexts/MarkdownContext";
import { TextEditor } from ".";

describe("<TextEditor />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(<TextEditor />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should set md on textarea change", async () => {
    render(
      <MarkdownProvider>
        <TextEditor />
      </MarkdownProvider>
    );
    const textarea = screen.getByRole("textbox");

    expect(textarea.textContent).toBe("");
    await userEvent.type(textarea, "# Hello World!");
    expect(textarea).toHaveValue("# Hello World!");
  });
});
