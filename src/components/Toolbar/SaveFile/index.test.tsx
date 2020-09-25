import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "utils/test-utils";

import { SaveFileMenuItem } from ".";

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
});
