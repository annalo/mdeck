import React from "react";
import { render } from "utils/test-utils";
import { Home } from ".";

jest.mock("screenfull", () => ({
  request: jest.fn(),
  off: jest.fn(),
  on: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

describe("<Home />", () => {
  test("should render and match the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
