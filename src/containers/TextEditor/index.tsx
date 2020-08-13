import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {} // eslint-disable-line

export const TextEditor = memo((props: Props) => {
  return (
    <Div>
      <textarea />
    </Div>
  );
});

const Div = styled.div``;

export default TextEditor;
