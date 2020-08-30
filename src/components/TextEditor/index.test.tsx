import React from "react";
import { render } from "@testing-library/react";
import { TextEditor } from ".";

describe("<TextEditor />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(<TextEditor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
