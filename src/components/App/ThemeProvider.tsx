import React from "react";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";

// light to dark
const colorScheme = {
  snow: "#fafafa",
  lightgrey: "#d4d4d4",
  silver: "#bababa",
  grey: "#888888",
  nightrider: "#2f2f2f",
};

const theme = {
  colorScheme,
  toolbarHeight: 25,
  editorBackgroundColor: colorScheme.snow,
  textColor: colorScheme.nightrider,
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StyledComponentThemeProvider theme={theme}>
    {children}
  </StyledComponentThemeProvider>
);

export { theme, ThemeProvider };
