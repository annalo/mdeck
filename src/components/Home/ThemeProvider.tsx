import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

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
  navBarHeight: 25,
  textAreaBackgroundColor: colorScheme.snow,
  textColor: colorScheme.nightrider,
};

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);

export { theme, ThemeProvider };
