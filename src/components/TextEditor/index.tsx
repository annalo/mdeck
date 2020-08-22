// TODO cleanup
import React, { memo, useContext, useRef } from "react";
import styled from "styled-components/macro";
// import debounce from "lodash/debounce";

import { MarkdownContext } from "contexts/MarkdownContext";
import { useHover } from "./useHover";
import { useLineNumberOnScroll } from "./useLineNumberOnScroll";
import { useSync } from "./useSync";

const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  background-color: transparent;
  border: none;
  font-size: 15px;
  height: 100%;
  outline: none;
  padding: 1em;
  resize: none;
`;

export const TextEditor: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useContext(MarkdownContext);
  const { activePane, lineNumber, md } = state;
  const isActive = activePane === "text";

  // const handleScrollDebounced = debounce(() => {
  //   console.log("handle textarea scroll");
  //   const node = ref.current;
  //   if (!isHovered || !node) return;

  //   const { scrollHeight, scrollTop, value } = node;
  //   const lineHeight = scrollHeight / value.split("\n").length;

  //   dispatch({
  //     type: "setLineNumber",
  //     lineNumber: Math.floor(scrollTop / lineHeight),
  //   });
  // }, 500);
  useHover({ dispatch, paneName: "text", ref });
  useLineNumberOnScroll({ dispatch, isActive, ref });
  useSync({ isActive, lineNumber, ref });
  console.log(lineNumber);

  return (
    <Container>
      <TextArea
        ref={ref}
        autoFocus
        onChange={(e): void => dispatch({ type: "setMd", md: e.target.value })}
        // onScroll={handleScrollDebounced}
        value={md}
      />
    </Container>
  );
};

export default memo(TextEditor);
