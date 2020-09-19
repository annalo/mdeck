import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const theme = {
  navBarHeight: 25,
  textAreaBackgroundColor: "#fafafa",
  textColor: "#2f2f2f",
};

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);

export { theme, ThemeProvider };
