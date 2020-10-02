import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-size: 16px;
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;

export { GlobalStyle };
