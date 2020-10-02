import { css } from "styled-components";

const blockquoteStyle = css`
  blockquote {
    border-left: 0.25em solid #d4d4d450;
    margin-left: 0;
    padding: 0 1em;
  }
`;
const codeStyle = css`
  pre {
    background-color: #d4d4d420;
    border: 1px solid grey;
    border-radius: 3px;
    line-height: 1em;
    overflow: visible;
    padding: 0.5em;
  }
`;
const headingStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
  }
`;
const linkStyle = css`
  a {
  }
`;
const listStyle = css`
  ul.contains-task-list {
    list-style-type: none;
    padding-left: 0;

    .task-list-item-checkbox {
      margin-left: 0.6em;
      margin-right: 0.3em;
      transform: scale(1.5);
    }
  }
`;
const paragraphStyle = css`
  p {
  }
`;
const tableStyle = css`
  table {
    border-collapse: collapse;
    width: 80%;

    tr:nth-child(even) {
      background-color: ${(props) => props.theme.colorScheme.lightgrey}40;
    }

    th,
    td {
      padding: 0.3em;
    }
  }

  table,
  th,
  td {
    border: 1px solid ${(props) => props.theme.colorScheme.lightgrey};
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
    padding: 3em;
    width: 100%;

    * {
      margin-top: 0;
      &:last-child {
        margin-bottom: 0 !important;
      }
    }

    ${blockquoteStyle}
    ${codeStyle}
    ${headingStyle}
    ${linkStyle}
    ${listStyle}
    ${paragraphStyle}
    ${tableStyle}
  }
`;

export { slideStyle };
