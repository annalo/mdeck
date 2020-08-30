import React from "react";
import { render } from "@testing-library/react";
import { Preview } from ".";

describe("<Preview />", () => {
  it("should render and match the snapshot", () => {
    const { asFragment } = render(<Preview />);
    expect(asFragment()).toMatchSnapshot();
  });
});
