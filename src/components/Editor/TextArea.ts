import styled from "styled-components";

const TEXT_AREA_LINE_HEIGHT = 18;

const TextArea = styled.textarea`
  background-color: ${(props) => props.theme.editorBackgroundColor};
  border: none;
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  height: 100%;
  line-height: ${TEXT_AREA_LINE_HEIGHT}px;
  outline: none;
  padding: 0.5em;
  resize: none;
  tab-size: 2;
  width: 100%;

  /* firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */
  @supports not (-moz-appearance: none) {
    padding-bottom: 90vh;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export { TEXT_AREA_LINE_HEIGHT, TextArea };
