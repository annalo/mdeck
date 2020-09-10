import React from "react";
import { render } from "@testing-library/react";

import { MarkdownProvider } from "contexts/MarkdownContext";
import { Preview } from ".";

describe("<Preview />", () => {
  test("should render and match the snapshot", () => {
    const wrapper = ({ children }) => (
      <MarkdownProvider>{children}</MarkdownProvider>
    );
    const { asFragment } = render(<Preview />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
