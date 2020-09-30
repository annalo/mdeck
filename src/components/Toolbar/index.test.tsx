import React from "react";
import { screen } from "@testing-library/react";
import { render } from "utils/test-utils";
import { Toolbar } from ".";

describe("<Toolbar />", () => {
  const requestPresentationMock = jest.fn();
  test("should render and match the snapshot", () => {
    const { asFragment } = render(
      <Toolbar requestPresentation={requestPresentationMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should disable presentation button if no markdown string", () => {
    render(<Toolbar requestPresentation={requestPresentationMock} />);

    const presentationButton = screen.getByRole("button", {
      name: /request-presentation/i,
    });
    expect(presentationButton).toHaveStyleRule("pointer-events", "none");
  });
});
