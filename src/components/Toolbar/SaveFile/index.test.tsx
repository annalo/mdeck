import React from "react";
import { saveAs } from "file-saver";

import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "utils/test-utils";

import { MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE } from "contexts/MarkdownContext";

import { SaveFileMenuItem } from ".";

jest.mock("file-saver");

afterEach(() => jest.clearAllMocks());

describe("<SaveFileMenuItem />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<SaveFileMenuItem />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("loads the save file form when clicked", () => {
    render(<SaveFileMenuItem />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  describe("<SaveFileForm />", () => {
    test("should save file with filename", () => {
      const filename = "test-file";
      const blob = new Blob([MARKDOWN_CONTEXT_DEFAULT_INITIAL_STATE.md], {
        type: "text/markdown",
      });

      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), `${filename}{enter}`);

      expect(saveAs).toHaveBeenNthCalledWith(1, blob, filename);
    });

    test("should persist last saved filename", () => {
      const filename = "test-file";

      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), `${filename}{enter}`);
      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByRole("textbox")).toHaveDisplayValue(filename);
    });

    test("should not persist filename if not saved", () => {
      const filename = "test-file";
      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), `${filename}{esc}`);
      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByRole("textbox")).not.toHaveValue();
    });

    test("exits form when form is submitted", () => {
      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), "{enter}");

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
    test("exits form when cancel button is clicked", () => {
      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      fireEvent.click(screen.getByLabelText(/cancel/i));

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
    test("exits form when Escape key is pressed", () => {
      render(<SaveFileMenuItem />);

      fireEvent.click(screen.getByRole("button"));
      userEvent.type(screen.getByRole("textbox"), "{esc}");

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
  });
});
