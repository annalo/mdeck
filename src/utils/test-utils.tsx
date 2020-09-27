/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { ThemeProvider } from "components/App/ThemeProvider";

import { MarkdownContextProvider } from "contexts/MarkdownContext";
import { PresentationContextProvider } from "contexts/PresentationContext";
import { SlideObserverProvider } from "contexts/SlideObserver";
import { CodeLineObserverProvider } from "contexts/CodeLineObserver";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <MarkdownContextProvider>
        <PresentationContextProvider>
          <SlideObserverProvider>
            <CodeLineObserverProvider>{children}</CodeLineObserverProvider>
          </SlideObserverProvider>
        </PresentationContextProvider>
      </MarkdownContextProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook = (hook, options) =>
  renderHook(hook, { wrapper: AllTheProviders, ...options });

// override render and renderHook methods
export { customRender as render, customRenderHook as renderHook };
