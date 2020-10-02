import React from "react";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";

const colors = {
  fauxwhite: "#fefefe",
  snow: "#fafafa",
  whitesmoke: "#f5f5f5",
  gallery: "#ededed",
  lightgrey: "#d6d6d6",
  silver: "#b2b2b2",
  grey: "#8e8e8e",
  charcoal: "#474747",
  nero: "#292929",
  // windstruck color palette
  storm: "#565c5e",
  forestgreen: "#455954",
  leather: "#9d7463",
  blue: "#b5c2c7",
  linen: "#dfdbd8",
  // // shoreline color palette
  // storm: "#0c2431",
  // teal: "#194a50",
  // sunburst: "#d37556",
  // sand: "#d8a28c",
  // cloud: "#e1dad2",
};

const theme = {
  colors,
  iconColor: colors.blue,
  toolbarColor: colors.forestgreen,
  toolbarHeight: 25,
  editorColor: colors.fauxwhite,
  previewColor: colors.whitesmoke,
  textColor: colors.nero,
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
