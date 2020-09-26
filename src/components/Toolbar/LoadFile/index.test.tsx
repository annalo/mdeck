import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "utils/test-utils";

import { Editor } from "components/Editor";
import { LoadFileMenuItem } from ".";

describe("<LoadFileMenuItem />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<LoadFileMenuItem />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("fileLoader input", () => {
    const fileContent = "file text content";
    const mockBlobText = jest.fn(() => {
      return Promise.resolve(fileContent);
    });

    beforeAll(() => {
      // Blob not supported in JSDOM https://github.com/jsdom/jsdom/issues/2555
      Object.defineProperty(Blob.prototype, "text", {
        value: mockBlobText,
        writable: true,
        configurable: true,
      });
    });

    test("should load .md files", async () => {
      render(
        <>
          <Editor />
          <LoadFileMenuItem />
        </>
      );

      const file = new File([fileContent], "file.md", {
        type: "text/markdown",
      });

      const fileLoader = screen.getByTitle(/Load Markdown File/i);
      userEvent.upload(fileLoader, file);

      await waitFor(() =>
        expect(screen.getByRole("textbox")).toHaveDisplayValue(fileContent)
      );
    });
  });
});
