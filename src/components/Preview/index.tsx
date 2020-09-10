import React, { memo } from "react";
import styled from "styled-components";
import { Slideshow } from "components/Slideshow";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Preview = memo(function Preview() {
  return (
    <Div>
      <Slideshow />
    </Div>
  );
});

export { Preview };
