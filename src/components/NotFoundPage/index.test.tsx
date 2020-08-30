import React from "react";
import { render, screen } from "@testing-library/react";

import { NotFoundPage } from "./index";

describe("<NotFoundPage />", () => {
  it("should render 'Page not found.' text", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
  });
});
