import styled from "styled-components";

const TEXT_AREA_LINE_HEIGHT = 18;

const TextArea = styled.textarea`
  background-color: transparent;
  border: none;
  height: 100%;
  outline: none;
  resize: none;

  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  margin-bottom: 0.3em;
  line-height: ${TEXT_AREA_LINE_HEIGHT}px;
  padding: 0.5em;
  tab-size: 2;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export { TEXT_AREA_LINE_HEIGHT, TextArea };
