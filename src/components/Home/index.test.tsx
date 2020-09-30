import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import screenfull from "screenfull";

import { render } from "utils/test-utils";

import { ThemeProvider } from "components/App/ThemeProvider";
import {
  MarkdownContextProvider,
  MARKDOWN_CONTEXT_INITIAL_STATE,
} from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

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

  describe("usePresentation/1", () => {
    test("should fullscreen slideshow when Toolbar presentation button is clicked", () => {
      const md = "test test";
      const wrapperWithState = ({ children }) => (
        <ThemeProvider>
          <MarkdownContextProvider
            initialState={{ ...MARKDOWN_CONTEXT_INITIAL_STATE, md }}
          >
            <SlideObserverProvider>
              <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
            </SlideObserverProvider>
          </MarkdownContextProvider>
        </ThemeProvider>
      );
      render(<Home />, { wrapper: wrapperWithState });

      fireEvent.click(
        screen.getByRole("button", { name: /request-presentation/i })
      );

      const slideshow = screen.getByRole("article");
      expect(screenfull.request).toHaveBeenNthCalledWith(1, slideshow);
    });
  });
});
