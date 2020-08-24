import React, { memo } from "react";
import styled from "styled-components/macro";
import { SlideshowProvider } from "contexts/SlideshowContext";
import { Slideshow } from "components/Slideshow";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Preview: React.FC = () => {
  return (
    <Div>
      <SlideshowProvider>
        <Slideshow />
      </SlideshowProvider>
    </Div>
  );
};

export default memo(Preview);
