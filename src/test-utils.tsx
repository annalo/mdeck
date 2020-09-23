/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { render } from "@testing-library/react";

import { ThemeProvider } from "components/Home/ThemeProvider";
import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <MarkdownContextProvider>
        <SlideObserverProvider>
          <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
        </SlideObserverProvider>
      </MarkdownContextProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
