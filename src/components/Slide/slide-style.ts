import { css } from "styled-components";

const blockquoteStyle = css`
  blockquote {
    border-left: 0.25em solid lightgrey;
    padding: 0 1em;
  }
`;
const codeStyle = css`
  pre {
    overflow: visible;
  }
`;

const slideStyle = css`
  section {
    align-items: stretch;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    font-size: 25px;
    height: 100%;
    justify-content: center;
    padding: 5em;
    width: 100%;

    ${blockquoteStyle}
    ${codeStyle}
  }
`;

export { slideStyle };
