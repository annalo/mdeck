import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "utils/test-utils";

import { LoadFileMenuItem } from ".";

describe("<LoadFileMenuItem />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<LoadFileMenuItem />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Blob not supported in JSDOM https://github.com/jsdom/jsdom/issues/2555
  describe("input file loader", () => {
    test.skip("should load .md files", () => {
      render(<LoadFileMenuItem />);

      const file = new File(["(⌐□_□)"], "file.md", {
        type: "text/markdown",
      });
      const fileLoader = screen.getByTitle(/Load Markdown File/i);

      fireEvent.change(fileLoader, { target: { files: [file] } });
    });
  });
});
