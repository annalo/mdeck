import React, { memo } from "react";
import styled from "styled-components/macro";

import { Slideshow } from "components/Slideshow";

interface Props {
  slides: string[];
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Preview: React.FC<Props> = memo(({ slides }: Props) => (
  <Container>
    <Slideshow slides={slides} />
  </Container>
));
