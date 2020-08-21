import React, { memo } from "react";
import styled from "styled-components/macro";
import { Slideshow } from "components/Slideshow";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Preview: React.FC = () => {
  return (
    <Div>
      <Slideshow />
    </Div>
  );
};

export default memo(Preview);
