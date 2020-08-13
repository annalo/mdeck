import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { TextEditor } from ".";

const renderComponent = () =>
  render(
    <HelmetProvider>
      <TextEditor markdown="markdown text" setMarkdown={() => {}} />
    </HelmetProvider>
  );

describe("<TextEditor />", () => {
  it("should match the snapshot", () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
